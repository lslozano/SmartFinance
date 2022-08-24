// Get hold of Form
const form = document.querySelector('.form')

// Get hold of inputs
const inputUsername = document.querySelector('#username')
const inputPassword = document.querySelector('#password')

// Get hold of required text
const requiredTexts = document.querySelectorAll('.required-text')

// Get hold of login button
const loginUserButton = document.querySelector('#login-user-btn')

// Verify if inputs are filled
const verifyInputFilled = input => {
    if (input.value.length == 0) {
        input.style.borderColor = '#dc3545'
        loginUserButton.classList.add('disabled-btn')

        switch(input.name) {
            case 'username':
                requiredTexts[0].style.display = 'block'
                break
            case 'password':
                requiredTexts[1].style.display = 'block'
                break
            default:
                break
        }
    } else {
        input.style.borderColor = '#ced4da'

        switch(input.name) {
            case 'username':
                requiredTexts[0].style.display = 'none'
                break
            case 'password':
                requiredTexts[1].style.display = 'none'
                break
            default:
                break
        }
    }

    if (
        inputUsername.value.length != 0
        && inputPassword.value.length != 0
    ) {
        requiredTexts.forEach(text => text.style.display = 'none')
        loginUserButton.classList.remove('disabled-btn')
    }
}

// Prevents submission on form when values are empty
const preventSubmitOnEnter = event => {
    if (
        inputUsername.value.length != 0
        && inputPassword.value.length != 0
    ) {
        return event.preventDefault()
    }
}

// Detect if user leaves a field empty when moving with tab key
const verifyOnTab = event => {
    const { name: inputName, value } = event.path[0]
    if (value === '') {
        switch(inputName) {
            case 'username':
                if (inputUsername.value.length === 0) {
                    inputUsername.style.borderColor = '#dc3545'
                    requiredTexts[0].style.display = 'block'
                }
                break
            case 'password':
                if (inputPassword.value.length === 0) {
                    inputPassword.style.borderColor = '#dc3545'
                    requiredTexts[1].style.display = 'block'
                }
                break
            default:
                break
        }
    } else {
        switch(inputName) {
            case 'username':
                if (inputUsername.value.length != 0) {
                    inputUsername.style.borderColor = '#ced4da'
                    requiredTexts[0].style.display = 'none'
                }
                break
            case 'password':
                if (inputPassword.value.length != 0) {
                    inputPassword.style.borderColor = '#ced4da'
                    requiredTexts[1].style.display = 'none'
                }
                break
            default:
                break
        }
    }

    if (
        inputUsername.value.length != 0
        && inputPassword.value.length != 0
    ) {
        requiredTexts.forEach(text => text.style.display = 'none')
        loginUserButton.classList.remove('disabled-btn')
    }
}

// Event listener for form to avoid submit on enter
form.addEventListener('keypress', (event) => event.key === 'Enter' ? preventSubmitOnEnter(event) : null)
// Verify fields of form if user presses tab
form.addEventListener('keydown', (event) => event.key === 'Tab' ? verifyOnTab(event) : null)

// Mouse out events for input fields
inputUsername.addEventListener('mouseout', () => verifyInputFilled(inputUsername))
inputPassword.addEventListener('mouseout', () => verifyInputFilled(inputPassword))