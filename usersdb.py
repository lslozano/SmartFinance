from flask import render_template, redirect, session
import sqlite3
from werkzeug.security import check_password_hash, generate_password_hash

# Establish connection to db
connection = sqlite3.connect('users.db')
cursor = connection.cursor()

# Create userdb table
cursor.execute('''CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, hash TEXT NOT NULL, income NUMERIC NOT NULL)
''')

# Close connection to db
connection.close()

def create(username, password, income):
    # Open db connection
    connection = sqlite3.connect("users.db")
    cursor = connection.cursor()

    # Search for user
    cursor.execute("SELECT * FROM users WHERE username = ?", [username])
    rows = cursor.fetchall()

    # If user does not exists, create one
    if not rows:
        cursor.execute("INSERT INTO users(username, hash, income) VALUES(?, ?, ?)",
                    (username, generate_password_hash(password, method='pbkdf2:sha256', salt_length=8), int(income))
        )
        connection.commit()
        cursor.execute("SELECT * FROM users WHERE username = ?", [username])
        user = cursor.fetchall()
        session["user_id"] = user[0][0]
        session["username"] = user[0][1]
        session["user_income"] = user[0][2]

        # Close connection
        connection.close()

        # Redirect to dashboard
        return redirect("/dashboard")
    else:
        # Close connection
        connection.close()
        # If user exists, return apology.
        return render_template("apology.html", error_message="User already registered", page="Register")

def login(username, password):
    # Open db connection
    connection = sqlite3.connect("users.db")
    cursor = connection.cursor()

    # Search for user
    cursor.execute("SELECT * FROM users WHERE username = ?", [username])
    user = cursor.fetchall()

    # If invalid user or password render apology
    if not user or not check_password_hash(user[0][2], password):
        return render_template("apology.html", error_message="Invalid username/password", page="Login")

    # Save session
    session["user_id"] = user[0][0]
    session["username"] = user[0][1]
    session["user_income"] = user[0][2]

    # Close connection to db
    connection.close()

    return redirect("/dashboard")

def change_password(new_password):
    # Open connection to db
    connection = sqlite3.connect("users.db")
    cursor = connection.cursor()

    # Update password and commit
    cursor.execute("UPDATE users SET hash = ? WHERE username = ?", [generate_password_hash(new_password, method='pbkdf2:sha256', salt_length=8), session["username"]])
    connection.commit()

    connection.close()

    return redirect("/settings")

def change_income(new_income):
    # Open connection to db
    connection = sqlite3.connect("users.db")
    cursor = connection.cursor()

    # Update income
    cursor.execute("UPDATE users SET income = ? WHERE username = ?", [int(new_income), session["username"]])
    connection.commit()

    connection.close()

    return redirect("/settings")
