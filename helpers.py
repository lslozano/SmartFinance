from flask import redirect, session
from functools import wraps

# Prevents access to certain routes if there isn't a user logged in
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function

def usd(value):
    """Format value as USD."""
    return f"${value:,.2f}"

# Returns the element at the 8th position in the expense list as the key to be
# the one to take into consideration for the sort method.
# It specifically returns the full date
def byDateDescending(expense):
  return expense[8]