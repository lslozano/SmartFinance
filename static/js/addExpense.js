// Get hold of form
const form = document.querySelector('.form')

// Get hold of Input Fields
const expenseName = document.querySelector('#name')
const expenseTotal = document.querySelector('#total')
const expenseTypes = document.getElementsByName('type')
const expenseDate = document.querySelector('#expense-date')

let expenseType = ''

// Get hold of Required Texts
const requiredTexts = document.querySelectorAll('.required-text')

// Get hold of Submit Expense Button
const submitExpenseBtn = document.querySelector('#submit-expense-btn')

// Validate expense type is correct
const validateExpenseType = expenseType => {
    if (expenseType === 'Life' || expenseType === 'Fun') {
        return true
    }

    return false
}

// Verify if fields are filled
const verifyInputFilled = input => {
    if (input.value.length === 0) {
        input.style.borderColor = '#dc3545'
        submitExpenseBtn.classList.add('disabled-btn')

        switch(input.name) {
            case 'name':
                requiredTexts[0].style.display = 'block'
                requiredTexts[0].style.top = '23px'
                break
            case 'total':
                requiredTexts[1].style.display = 'block'
                requiredTexts[1].style.top = '23px'
                break
            case 'expense-date':
                requiredTexts[2].style.display = 'block'
                requiredTexts[2].style.top = '23px'
                break
            default:
                break
        }
    } else {
        input.style.borderColor = '#ced4da'

        switch(input.name) {
            case 'name':
                requiredTexts[0].style.display = 'none'
                requiredTexts[0].style.top = 'initial'
                break
            case 'total':
                requiredTexts[1].style.display = 'none'
                requiredTexts[1].style.top = 'initial'
                break
            case 'expense-date':
                requiredTexts[2].style.display = 'none'
                requiredTexts[2].style.top = 'initial'
                break
            default:
                break
        }
    }

    if (
        expenseName.value.length != 0
        && expenseTotal.value.length != 0
        && (expenseType != '' && (validateExpenseType(expenseType)))
        && expenseDate.value.length != 0
    ) {
        submitExpenseBtn.classList.remove('disabled-btn')
        requiredTexts.forEach(text => text.style.display = 'none')
    }
}

// Prevents submission on form when values are empty
const preventSubmitOnEnter = event => {
    if (
        expenseName.value.length != 0
        && expenseTotal.value.length != 0
        && (expenseType != '' && (validateExpenseType(expenseType)))
        && expenseDate.value.length != 0
    ) {
        return event.preventDefault()
    }
}

// Detect if user leaves a field empty when moving with tab key
const verifyOnTab = event => {
    const { name: inputName, value } = event.path[0]
    if (value === '') {
        switch(inputName) {
            case 'name':
                if (expenseName.value.length === 0) {
                    expenseName.style.borderColor = '#dc3545'
                    requiredTexts[0].style.display = 'block'
                    requiredTexts[0].style.top = '48px'
                }
                break
            case 'total':
                if (expenseTotal.value.length === 0) {
                    expenseTotal.style.borderColor = '#dc3545'
                    requiredTexts[1].style.display = 'block'
                    requiredTexts[1].style.top = '23px'
                }
                break
            case 'expense-date':
                if (expenseDate.value.length === 0) {
                    expenseDate.style.borderColor = '#dc3545'
                    requiredTexts[2].style.display = 'block'
                    requiredTexts[2].style.top = '48px'
                }
                break
            default:
                break
        }
    } else {
        switch(inputName) {
            case 'name':
                if (expenseName.value.length != 0) {
                    expenseName.style.borderColor = '#ced4da'
                    requiredTexts[0].style.display = 'none'
                    requiredTexts[0].style.top = 'initial'
                }
                break
            case 'total':
                if (expenseTotal.value.length != 0) {
                    expenseTotal.style.borderColor = '#ced4da'
                    requiredTexts[1].style.display = 'none'
                    requiredTexts[1].style.top = 'initial'
                }
                break
            case 'expense-date':
                if (expenseDate.value.length != 0) {
                    expenseDate.style.borderColor = '#ced4da'
                    requiredTexts[2].style.display = 'none'
                    requiredTexts[2].style.top = 'initial'
                }
                break
            default:
                break
        }
    }

    if (
        expenseName.value.length != 0
        && expenseTotal.value.length != 0
        && (expenseType != '' && (validateExpenseType(expenseType)))
        && expenseDate.value.length != 0
    ) {
        submitExpenseBtn.classList.remove('disabled-btn')
        requiredTexts.forEach(text => text.style.display = 'none')
    }
}

// Event listener for form to avoid submit on enter
form.addEventListener('keypress', (event) => event.key === 'Enter' ? preventSubmitOnEnter(event) : null)
// Verify fields of form if user presses tab
form.addEventListener('keydown', (event) => event.key === 'Tab' ? verifyOnTab(event) : null)

// Event listeners to determine if field is filled
expenseName.addEventListener('mouseout', () => verifyInputFilled(expenseName))
expenseTotal.addEventListener('mouseout', () => verifyInputFilled(expenseTotal))
expenseDate.addEventListener('mouseout', () => verifyInputFilled(expenseDate))
// Get value from expense type radio when user clicks on it
expenseTypes.forEach(type =>
    type.addEventListener('click', () => expenseType = type.value)
)

