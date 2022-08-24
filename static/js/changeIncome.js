// Get hold of form
const form = document.querySelector('.form')

// Get hold of Input
const inputNewIncome = document.querySelector('#income')

// Get hold of submit button
const submitBtn = document.querySelector('#change-income-btn')

// Get hold of required text
const requiredText = document.querySelector('.required-text')

// Verify if Inputs are correctly filled
const verifyInputFilled = input => {
    if (input.value.length === 0) {
        input.style.borderColor = '#dc3545'
        submitBtn.classList.add('disabled-btn')
        requiredText.style.display = 'block'
    } else {
        input.style.borderColor = '#ced4da'
        requiredText.style.display = 'none'
    }

    if (inputNewIncome.value.length != 0) {
        submitBtn.classList.remove('disabled-btn')
        requiredText.style.display = 'none'
    }
}

// Prevents submission on form when values are empty
const preventSubmitOnEnter = event => {
    if (inputNewIncome.value.length != 0) {
        return event.preventDefault()
    }
}

// Detect if user leaves a field empty when moving with tab key
const verifyOnTab = event => {
    const { name: inputName, value } = event.path[0]
    if (value === '') {
        inputNewIncome.style.borderColor = '#dc3545'
        requiredText.style.display = 'block'
    } else {
        inputNewIncome.style.borderColor = '#ced4da'
        requiredText.style.display = 'none'
    }

    if (inputNewIncome.value.length != 0) {
        submitBtn.classList.remove('disabled-btn')
        requiredText.style.display = 'none'
    }
}

// Event listener for form to avoid submit on enter
form.addEventListener('keypress', (event) => event.key === 'Enter' ? preventSubmitOnEnter(event) : null)
// Verify fields of form if user presses tab
form.addEventListener('keydown', (event) => event.key === 'Tab' ? verifyOnTab(event) : null)

// Mouse out events
inputNewIncome.addEventListener("mouseout", () => verifyInputFilled(inputNewIncome))