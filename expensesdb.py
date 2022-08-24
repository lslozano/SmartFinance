from flask import render_template, redirect
import sqlite3

# Establish connection to db
connection = sqlite3.connect('expenses.db')
cursor = connection.cursor()

# Create expensedb table
cursor.execute('''CREATE TABLE IF NOT EXISTS expenses(
    id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, name TEXT NOT NULL, total NUMERIC NOT NULL, type TEXT NOT NULL, day TEXT NOT NULL, month TEXT NOT NULL, year TEXT NOT NULL, full_date TEXT NOT NULL)
''')

# Close connection to db
connection.close()

def create(user_id, expense_name, expense_total, expense_type, day, month, year, expense_date):
    # Open db connection
    connection = sqlite3.connect("expenses.db")
    cursor = connection.cursor()

    cursor.execute("INSERT INTO expenses(user_id, name, total, type, day, month, year, full_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
                    (user_id, expense_name, expense_total, expense_type, day, month, year, expense_date)
    )

    # Commit changes
    connection.commit()

    # Close connection
    connection.close()

    # Redirect to dashboard
    return redirect("/dashboard")