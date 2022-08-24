const income = document.querySelector('.text-income')
const expense = document.querySelector('.text-expense')
const balance = document.querySelector('.text-balance')

const setBalanceTextColor = () => {
    if (income == null || expense == null) return

    const intIncome = parseInt(income.innerHTML.replace(/\$|,/g, ''), 10)
    const intExpense = parseInt(expense.innerHTML.replace(/\$|,/g, ''), 10)

    const result = intIncome - intExpense

    if (result > 0) {
        return balance.style.color = '#198754'
    } else {
        return balance.style.color = '#dc3545'
    }
}

window.addEventListener('load', () => setBalanceTextColor())

