from multiprocessing.sharedctypes import Value
from urllib import request
from flask import Flask, render_template, redirect, request, session
from werkzeug.security import check_password_hash
from flask_session import Session
import sqlite3
from datetime import datetime
from dateutil import relativedelta
from helpers import login_required, usd, byDateDescending
import usersdb
import expensesdb


app = Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True

# Configures app session
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Custom filter
app.jinja_env.filters["usd"] = usd

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/faq")
def faq():
    return render_template("faq.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    page = "Register"
    if request.method == "POST":
        username = request.form.get("username")
        income = request.form.get("income")
        password = request.form.get("password")
        confirmed_password = request.form.get("confirmation")
        error = False

        if not username or not income or not password:
            error_message = "Please fill the required information."
            return render_template("apology.html", error_message=error_message, page=page)

        if password != confirmed_password:
            error_message = "The password did not match."
            return render_template("apology.html", error_message=error_message, page=page)

        try:
            int(income)
        except ValueError:
            error = True

        if error:
            error_message = "Something went wrong. Please try again."
            return render_template("apology.html", error_message=error_message, page=page)

        return usersdb.create(username, password, income)
    else:
        return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    # Forget any user_id
    session.clear()
    page = "Login"

    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        if not username or not password:
            error_message = "Please enter the required information"
            return render_template("apology.html", error_message=error_message, page=page)

        return usersdb.login(username, password)
    else:
        return render_template("login.html")

@app.route("/add_expense", methods=["GET", "POST"])
@login_required
def add_expense():
    page = "Add Expense"

    if request.method == "POST":
        user_id = session["user_id"]
        expense_name = request.form.get("name")
        expense_total = request.form.get("total")
        expense_type = request.form.get("type")
        date = request.form.get("expense-date")
        error = False

        if not expense_name or not expense_total or not expense_type or not date:
            error_message = "Please fill in the required information"
            return render_template("apology.html", error_message=error_message, page=page)

        try:
            int(expense_total)
        except ValueError:
            error = True

        if error:
            error_message = "Something went wrong. Please try again."
            return render_template("apology.html", error_message=error_message, page=page)

        expense_date = datetime.strptime(date, '%Y-%m-%d')

        try:
            type(expense_date) is datetime
        except ValueError:
            error = True

        if error:
            error_message = "Something went wrong. Please try again."
            return render_template("apology.html", error_message=error_message, page=page)

        # Remove time for date
        date_without_time = expense_date.strftime('%Y-%m-%d')

        # Get hold of day, month and year from expense_date
        day = expense_date.strftime("%d")
        month = expense_date.strftime("%B")
        year = expense_date.strftime("%Y")

        return expensesdb.create(user_id, expense_name, expense_total, expense_type, day, month, year, date_without_time)
    else:
        return render_template("add_expense.html")

@app.route("/dashboard")
@login_required
def dashboard():
    # Open connection to get income of user
    connection = sqlite3.connect("users.db")
    cursor = connection.cursor()

    cursor.execute("SELECT income FROM users WHERE id = ?", [session["user_id"]])
    income = cursor.fetchall()
    user_income = income[0][0]

    connection.close()

    # Open connection to get expenses of user
    connection = sqlite3.connect("expenses.db")
    cursor = connection.cursor()

    date = datetime.now()
    month = date.strftime("%B")

    cursor.execute("SELECT SUM(total) FROM expenses WHERE user_id = ? AND month = ?", [session["user_id"], month])
    expenses = cursor.fetchall()

    if not expenses[0][0]:
        connection.close()
        user_expenses = 0
        return render_template("dashboard.html", user_income=user_income, user_expenses=user_expenses, user_balance=user_income)

    user_expenses = expenses[0][0]

    connection.close()

    # Get user balance
    user_balance = user_income - user_expenses

    return render_template("dashboard.html", user_income=user_income, user_expenses=user_expenses, user_balance=user_balance)


@app.route("/details")
@login_required
def details():
    return render_template("details.html")

@app.route("/details/current_month")
@login_required
def current_month():
    # Open db connection
    connection = sqlite3.connect("users.db")
    cursor = connection.cursor()

    cursor.execute("SELECT income FROM users WHERE id = ?", [session["user_id"]])
    income = cursor.fetchall()
    user_income = income[0][0]

    connection.close()

    connection = sqlite3.connect("expenses.db")
    cursor = connection.cursor()

    date = datetime.now()
    month = date.strftime("%B")

    cursor.execute("SELECT SUM(total) FROM expenses WHERE user_id = ? AND month = ?", [session["user_id"], month])
    expenses = cursor.fetchall()
    user_expenses = expenses[0][0]

    if not user_expenses:
        return render_template("current_month.html", expenses_list=user_expenses)

    cursor.execute("SELECT * FROM expenses WHERE user_id = ? AND month = ?", [session["user_id"], month])
    expenses_list = cursor.fetchall()

    # Order list descending order by date
    expenses_list.sort(reverse=True, key=byDateDescending)

    connection.close()

    # Get user balance
    user_balance = user_income - user_expenses

    return render_template("current_month.html", month=month, user_income=user_income, user_expenses=user_expenses, user_balance=user_balance, expenses_list=expenses_list)

@app.route("/details/current_year")
@login_required
def current_year():
    # Open db connection
    connection = sqlite3.connect("users.db")
    cursor = connection.cursor()

    cursor.execute("SELECT income FROM users WHERE id = ?", [session["user_id"]])
    income = cursor.fetchall()
    user_income = income[0][0] * 12

    connection.close()

    connection = sqlite3.connect("expenses.db")
    cursor = connection.cursor()

    date = datetime.now()
    year = date.strftime("%Y")

    cursor.execute("SELECT SUM(total) FROM expenses WHERE user_id = ? AND year = ?", [session["user_id"], year])
    expenses = cursor.fetchall()
    user_expenses = expenses[0][0]

    if not user_expenses:
        return render_template("current_year.html", expenses_list=user_expenses)

    cursor.execute("SELECT * FROM expenses WHERE user_id = ? AND year = ?", [session["user_id"], year])
    expenses_list = cursor.fetchall()

    # Order list descending order by date
    expenses_list.sort(reverse=True, key=byDateDescending)

    connection.close()

    # Get user balance
    user_balance = user_income - user_expenses

    return render_template("current_year.html", year=year, user_income=user_income, user_expenses=user_expenses, user_balance=user_balance, expenses_list=expenses_list)

@app.route("/details/custom_search", methods=["GET", "POST"])
@login_required
def custom_search():
    page = "Custom search"

    if request.method == "POST":
        user_id = session["user_id"]
        expense_type = request.form.get("type")
        start_date = request.form.get("start-date")
        end_date = request.form.get("end-date")
        error = False

        if not expense_type or not start_date or not end_date:
            error_message = "Please fill in the required information"
            return render_template("apology.html", error_message=error_message, page=page)

        start_date_value = datetime.strptime(start_date, '%Y-%m-%d')
        end_date_value = datetime.strptime(end_date, '%Y-%m-%d')

        try:
            type(start_date_value) is datetime
        except ValueError:
            error = True

        try:
            type(end_date_value) is datetime
        except ValueError:
            error = True

        if start_date_value > end_date_value:
            error = True

        if error:
            error_message = "Something went wrong. Please try again."
            return render_template("apology.html", error_message=error_message, page=page)


        # Remove time for date
        start_date_without_time = start_date_value.strftime('%Y-%m-%d')
        end_date_without_time = end_date_value.strftime('%Y-%m-%d')

        # Get the relativedelta between two dates
        delta = relativedelta.relativedelta(end_date_value, start_date_value)
        period_of_years_searched = delta.years
        period_of_months_searched = delta.months

        connection = sqlite3.connect("users.db")
        cursor = connection.cursor()

        cursor.execute("SELECT income FROM users WHERE id = ?", [session["user_id"]])
        income = cursor.fetchall()
        user_income = income[0][0]

        total_months = 0

        if period_of_years_searched >= 1:
            total_months = period_of_years_searched * 12

        if period_of_months_searched >= 1:
            total_months = total_months + period_of_months_searched

        if total_months == 0:
            total_months = 1

        user_income = user_income * total_months

        connection.close()

        connection = sqlite3.connect("expenses.db")
        cursor = connection.cursor()

        if expense_type == "All":
            cursor.execute('''
                SELECT SUM(total) FROM expenses WHERE user_id = ? AND full_date BETWEEN ? AND ?
            ''', [session["user_id"], start_date_without_time, end_date_without_time])
            expenses = cursor.fetchall()
            user_expenses = expenses[0][0]

            if not user_expenses:
                return render_template("results.html")

            cursor.execute('''
                SELECT * FROM expenses WHERE user_id = ? AND full_date BETWEEN ? AND ?
            ''', [user_id, start_date_without_time, end_date_without_time])
            expenses_list = cursor.fetchall()

            # Order list descending order by date
            expenses_list.sort(reverse=True, key=byDateDescending)

            connection.close()

            user_balance = user_income - user_expenses

            return render_template("results.html", user_income=user_income, user_expenses=user_expenses, user_balance=user_balance, expenses_list=expenses_list)
        else:
            cursor.execute('''
                SELECT SUM(total) FROM expenses WHERE user_id = ? AND type = ? AND full_date BETWEEN ? AND ?
            ''', [session["user_id"], expense_type, start_date_without_time, end_date_without_time])
            expenses = cursor.fetchall()
            user_expenses = expenses[0][0]

            if not user_expenses:
                return render_template("results.html")

            cursor.execute('''
                SELECT * FROM expenses WHERE user_id = ? AND type = ? AND full_date BETWEEN ? AND ?
            ''', [user_id, expense_type, start_date_without_time, end_date_without_time])
            expenses_list = cursor.fetchall()

            # Order list in descending order by date
            expenses_list.sort(reverse=True, key=byDateDescending)

            connection.close()

            user_balance = user_income - user_expenses

            return render_template("results.html", user_income=user_income, user_expenses=user_expenses, user_balance=user_balance, expenses_list=expenses_list)
    else:
        return render_template("custom_search.html")

@app.route("/settings")
@login_required
def profile():
    return render_template("/settings.html")


@app.route("/settings/change_password", methods=["GET", "POST"])
@login_required
def change_password():
    if request.method == "POST":
        current_password = request.form.get("current-password")
        new_password = request.form.get("password")
        confirm_password = request.form.get("confirmation")
        page = "Change Password"

        if not current_password or not new_password or not confirm_password:
            error_message = "Please fill the required information."
            return render_template("/apology.html", error_message=error_message, page=page)

        if new_password != confirm_password:
            error_message = "Password confirmation not fulfilled."
            return render_template("/apology.html", error_message=error_message, page=page)

        # Open connection to db
        connection = sqlite3.connect("users.db")
        cursor = connection.cursor()

        cursor.execute("SELECT * FROM users WHERE id = ?", [session["user_id"]])
        user = cursor.fetchall()

        # If invalid password render apology
        if not check_password_hash(user[0][2], current_password):
            error_message = "Invalid password."
            connection.close()
            return render_template("apology.html", error_message=error_message, page=page)

        connection.close()

        return usersdb.change_password(new_password)
    else:
        return render_template("/change_password.html")

@app.route("/settings/change_income", methods=["GET", "POST"])
@login_required
def change_income():
    page = "Change Income"
    if request.method == "POST":
        new_income = request.form.get("income")
        error = False

        if not new_income:
            error_message = "Please fill all of the required information."
            return render_template("apology.html", error_message=error_message, page=page)

        try:
            int(new_income)
        except ValueError:
            error = True

        if error:
            error_message = "Please input integer numbers only."
            return render_template("apology.html", error_message=error_message, page=page)

        return usersdb.change_income(new_income)
    else:
        return render_template("change_income.html")

@app.route("/logout")
def logout():
    # Clear session
    session.clear()
    return redirect("/")
