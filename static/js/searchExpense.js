// Get hold of form
const form = document.querySelector('.form')

// Get hold of Input Fields
const expenseTypes = document.getElementsByName('type')
const startDate = document.querySelector('#start-date')
const endDate = document.querySelector('#end-date')

let expenseType = ''

// Get hold of required texts
const requiredTexts = document.querySelectorAll('.required-text')

// Get hold of Search Button
const submitSearchBtn = document.querySelector('#submit-search-btn')

// Validate expense type is correct
const validateExpenseType = expenseType => {
    if (
        expenseType === 'Life'
        || expenseType === 'Fun'
        || expenseType === 'All'
    ) {
        return true
    }

    return false
}

// Verify if fields are filled
const verifyInputFilled = input => {
    if (input.value.length === 0) {
        input.style.borderColor = '#dc3545'
        submitSearchBtn.classList.add('disabled-btn')

        switch(input.name) {
            case 'start-date':
                requiredTexts[0].style.display = 'block'
                requiredTexts[0].style.top = '23px'
                break
            case 'end-date':
                requiredTexts[1].style.display = 'block'
                requiredTexts[1].style.top = '23px'
                break
            default:
                break
        }
    } else {
        input.style.borderColor = '#ced4da'

        switch(input.name) {
            case 'start-date':
                requiredTexts[0].style.display = 'none'
                requiredTexts[0].style.top = 'initial'
                break
            case 'end-date':
                requiredTexts[1].style.display = 'none'
                requiredTexts[1].style.top = 'initial'
                break
            default:
                break
        }
    }

    if (
        expenseType != '' && (validateExpenseType(expenseType))
        && startDate.value.length != 0
        && endDate.value.length != 0
    ) {
        submitSearchBtn.classList.remove('disabled-btn')
        requiredTexts.forEach(text => text.style.display = 'none')
    }
}

// Prevents submission on form when values are empty
const preventSubmitOnEnter = event => {
    if (
        expenseType != '' && (validateExpenseType(expenseType))
        && startDate.value.length != 0
        && endDate.value.length != 0
    ) {
        return event.preventDefault()
    }
}

// Detect if user leaves a field empty when moving with tab key
const verifyOnTab = event => {
    const { name: inputName, value } = event.path[0]
    if (value === '') {
        switch(inputName) {
            case 'start-date':
                if (startDate.value.length === 0) {
                    startDate.style.borderColor = '#dc3545'
                    requiredTexts[0].style.display = 'block'
                    requiredTexts[0].style.top = '23px'
                }
                break
            case 'expense-date':
                if (endDate.value.length === 0) {
                    endDate.style.borderColor = '#dc3545'
                    requiredTexts[1].style.display = 'block'
                    requiredTexts[1].style.top = '23px'
                }
                break
            default:
                break
        }
    } else {
        switch(inputName) {
            case 'start-date':
                if (startDate.value.length === 0) {
                    startDate.style.borderColor = '#dc3545'
                    requiredTexts[0].style.display = 'none'
                    requiredTexts[0].style.top = 'initial'
                }
                break
            case 'expense-date':
                if (endDate.value.length === 0) {
                    endDate.style.borderColor = '#dc3545'
                    requiredTexts[1].style.display = 'none'
                    requiredTexts[1].style.top = 'initial'
                }
                break
            default:
                break
        }
    }

    if (
        expenseType != '' && (validateExpenseType(expenseType))
        && startDate.value.length != 0
        && endDate.value.length != 0
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
startDate.addEventListener('mouseout', () => verifyInputFilled(startDate))
endDate.addEventListener('mouseout', () => verifyInputFilled(endDate))
// Get value from expense type radio when user clicks on it
expenseTypes.forEach(type =>
    type.addEventListener('click', () => expenseType = type.value)
)
