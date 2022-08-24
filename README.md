# SmartFinance - CS50 Final Project
## Introduction

My name is Luis Lozano.
I studied Law but on 2019 I decided to switch careers and become a developer. In 2020 I took a Web Development Bootcamp that propelled me into the right direction, but since then I've always wanted to take a course that helped me create a solid foundation for my new career, and to really learn the ins and outs; since I had only learned what was necessary to do the job, but not the intrincacies of programming and computer science.
So, when I discovered CS50 I knew I had my answer. In the end, this has been an awesome journey where I learned a lot and it has been exactly what I was looking for.

## Overview of the Project

SmartFinance is born out of an idea that I had a couple years ago. I'm very organized and like to keep track of my expenses, but I have always beeing doing it manually. I open up a spreadsheet, write down whatever I had spent and then put that against my monthly income.
That takes time and I knew there could be a way to simplify the process while keeping a record on what I'm spending my money on and how my monthly income is fairing.

With that said, I took the opportunity to precisely create a tool (as a web app) that helped me on that front for my CS50 final project, and I called it SmartFinance.

SmartFinance allows you to create an account, set your monthly income and via a form (from the Add Expense option) you can register an expense that you made at a certain date.
This expense will be saved in a database and all of the expenses made in the current month will be compared against your monthly salary. All of this information will be displayed at your dashboard (which shows the current month).
The dashboard has three main cards: Monthly income, which reports the income you established. Monthly expenses, which reports the total amount of money spent for that month and your Balance, which is a result of substracting your expenses to your income.
If the result is a positive number, this number will be colored green, if not, the number will be colored red.
Also, all of the quantities have colors attached to them: Income is green, Expenses is red and Balance is either green or red depending if it is positive or negative.

SmartFinance also includes the ability to see all of your expenses for the current month, the current year and do a custom search. All of this will be explained ahead with further details.

The technologies used for this project are: JavaScript, HTML, CSS, Python, Flask, Sqlite3, Jinja
To run the project locally just go to Run and select Run without Debugging.

## Project Roadmap

What follows is a chronological roadmap of the activities and steps that I took to bring this project into completion.

1.- First of all I started taking some written notes on what I wanted to do and what would the project would require. I wrote about what would my project do, what functionalities it would have, how many databases would it need, what the databases would require and what would be a version 1.0 of my project.

2.- When I had some notes taken on that matter, I asked myself specificially what would my databases be called and how many would I need. When I arrived at an answer to that, I broke into points the columns that would integrate the tables of my databases, which would be called users and expenses. More on the databases ahead.

3.- Knowing what would be a 1.0 version of my project and how many databases would I need and their requirements, I decided to start sketching some designs by hand on how I wanted my web application to look like.

4.- Finishing with that, and having a clear idea of what I wanted to do, the functionalities that needed to be integrated and all of the requirements, I decided to create a clickup project and start defining the tasks and their estimate times.

5.- Being done with the List, having all of the tasks created and estimated, I started working on the SmartFinance project.

## What does the project accomplishes

The project accomplishes exactly what I wanted to do.

When you create an account, it asks you to enter your monthly income. This is required because it is an integral part for comparing it against your monthly expenses and give you the result on how are you fairing.

Once you have an account and you set up your monthly income, now you can start registering expenses via the Add Expense section, which is a form.
This form asks you certain things: In what did you make an expense, how much did you spend, was the expense a life or a fun expense (for myself I consider life expense anything that is related to clothing, food, medical, etc and fun is like going to the movies, buying a videogame, etc), and the date in which you made that expense.
When you submit the form, this is saved at the expenses database.

Everytime you submit an expense, this is going to be put against your monthly income (if the expense is within the current month), yearly income (if it is within the current year) or an income that is calculated by the range of time when you do a custom search.

So, at the end of the day, you are able to access different views that can give you insight on your finances:
- The dashboard view gives you an insight for the current month. It shows you your income, your expenses and the balance. At the dashboard you can explore more options and go to a page that shows you: Current Month, Current Year and Custom Search. 
- Current Month, Current Year and the result of Custom Search will show you first of all your income, your total expenses and your balance for the selected period of time. Also, a table that is included will display all of the expenses made detailing the following information: Name, Total, Type, Day, Month and Year for each and every one of the expenses you made.

All of this makes the process of tracking my expenses way easier and knowing if I'm going overbudget or not.

## List of Functionalities

**Functionalities that do not require login:**
- Visit Homepage
- Visit About page
- Visit FAQ page
- Register User
- Login User
- Block unathorized access to pages that require login
- Store user session and name when registering.
- Store information of users in a user database when registering

**Functionalities that require login:**
- Store information of expenses in expenses database
- Visit Dashboard
- Change Password
- Change Income
- Add Expense
- Display Income, Expenses and Balance for Current Month at Dashboard
- Display Income, Expenses, Balance and a Table with expense details at Current Month View
- Display Income, Expenses, Balance and a Table with expenses details at Current Year View
- Display custom Income, Expenses, Balance and a Table with expenses details at Custom Search

## File Structure and Description

### Top level folders/files
|Folder/File|Description                         |
|----------------|-------------------------------|
|app.py|Main file that contains all of the main configurations, imports, definitions and variables to run the application |
|usersdb.py|Contains the definitions to create user, login, change the password and the income of the user|
|expensesdb.py|Containts the definition to create an expense|
|helpers.py|Contains definitions that are used throughout the application as helpers to achieve certain results|
|requirements.txt|Includes a list of dependencies|
|expenses.db|Expenses database|
|users.db|Users database|
|static|Folder that contains all of the files that are static in our applicaction. Contains three subfolders: css, images, js|
|templates|Folder that contains all of the views for our application|
|README.md|Contains in depth details describing the project, files, methods, roadmap for it, and everything needed to know and have the full scope of the project|

### Inner level folders - Static

#### CSS Folder
|File|Description                         |
|----------------|-------------------------------|
|styles.css|Includes all of the style selectors and rules for the application|

#### Images Folder
|File|Description                         |
|----------------|-------------------------------|
|card-1.jpg|Image used for the first card shown at index (a.k.a. landing)|
|card-2.jpg|Image used for the second card shown at index (a.k.a. landing)|
|card-3.jpg|Image used for the third card shown at index (a.k.a. landing)|
|error.jpg|Image used to display it at the apology view when something goes wrong|
|main-banner.jpg|Image used as a banner at index view and as a background for forms|
|secondary-banner.jpg|Image used as a banner in About and FAQ view|

#### JS Folder
|File|Description                         |
|----------------|-------------------------------|
|addExpense.js|Contains all of the functionality needed to validate the form to add an expense on the frontend|
|apology.js|Contains the functionality needed to return the user to the previous view when it is send to apology because something went wrong/an error occured|
|changeIncome.js|Contains all of the functionality needed to validate the form to change the income of the user on the frontend|
|changePassword.js|Contains all of the functionality needed to validate the form to change the password of the user|
|dashboard.js|Contains the functionality needed to display the proper colors of income, expense and balance values at the dashboard|
|login.js|Contains all of the functionality needed to validate the form to login|
|register.js|Contains all of the functionality needed to validate the form to register a user|
|searchExpense.js|Contains all of the functionality needed to validate the form to do a custom search for a type of expense and within certain date ranges|

#### Templates Folder
|File|Description                         |
|----------------|-------------------------------|
|about.html|Contains the html for the about view, which explains what is the application about|
|add_expense.html|Contains the html for the add expense view, which shows the user a form to add an expense|
|apology.html|Contains the html for the apology view, which renders everytime something goes wrong in the application when submitting a form|
|change_income.html|Contains the html for the change income view, which shows the user a form to change its income|
|change_password.html|Contains the html for the change password view, which shows the user a form to change its password|
|current_month.html|Contains the html for the current month view, which displays all of the expenses that the user has made in the current month, with information pertaining its total income, total of expenses made and balance|
|current_year.html|Contains the html for the current year view, which displays all of the expenses that the user has made in the current year, with information pertaining its total income, total of expenses made and balance|
|custom_search.html|Contains the html for the custom search view, which displays a form for the user to make a custom search for expenses. The search relies on the selected type of expense and a start and end date ranges|
|dashboard.html|Contains the html for the dashboard view. The view shows the user three cards displaying information for the current month: The first one contains information pertaining its monthly income, the second one shows information of the total of expenses made and the last one shows the balance, which is the result of substracting the expenses to the user income|
|details.html|Contains the html for the details view, which allows the user to select from three options (including an extra one to return to the dashboard) to see more details, this options are: Current Month, Current Year and a Custom Search (the results for custom search are displayed after the form is submitted|
|faq.html|Contains the html for the faq view, which is a simulation of frequently asked questions about the web application|
|index.html|Contains the html for the index view, which serves as the landing page|
|layout.html|Contains the html for the layout, which is used throughout all of the views in order to not repeat things as the navbar and the footer|
|login.html|Contains the html for the login view, which displays a form to the user to login into the web application|
|register.html|Contains the html for the register view, which displays a form to the user to register to the web application|
|results.html|Contains the html for the results view, which shows the expenses that meet the criteria submitted in the Custom Search form. This view will show an income that depends on the date range between start and finish, the total of the expenses made in that range, the balance and a table with all of the expenses|
|settings.html|Contains the html for the settings view, which allows the user to go to either Change Password or Change Income|

#### Table Structure
The tables that are shown at Current Month, Current Year and Custom Search have the following heads: Name, Total, Type, Day, Month, Year. The information is filled from the results that come from the expenses database.

#### Users Database Structure
|Column|Type|
|----------------|-------------------------------|
|id|INTEGER PRIMARY KEY AUTOINCREMENT|
|username|TEXT NOT NULL|
|hash|TEXT NOT NULL|
|income|NUMERIC NOT NULL|

#### Expenses Database Structure
|Column|Type|
|----------------|-------------------------------|
|id|INTEGER PRIMARY KEY AUTOINCREMENT|
|user_id|INTEGER NOT NULL|
|name|TEXT NOT NULL|
|total|NUMERIC NOT NULL|
|type|TEXT NOT NULL|
|day|TEXT NOT NULL|
|month|TEXT NOT NULL|
|year|TEXT NOT NULL|
|full_date|TEXT NOT NULL|

## Conclusion

This project helped me apply the knowledge learned throughout the CS50 course, and aside that, it helped me create something for me and bring to life an idea that I had in my head for some time now. It feels great to finally materialize that idea and bring it into the world.
So now, without anything much to say, the journey through this course was fantastic, I feel like I'm finishing a career! And, now... This was CS50!