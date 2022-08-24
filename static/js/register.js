// Get hold of Form
const form = document.querySelector('.form')

// Get hold of inputs
const inputUsername = document.querySelector('#username')
const inputIncome = document.querySelector('#income')
const inputPassword = document.querySelector('#password')
const inputConfirmPassword = document.querySelector('#confirm-password')

// Get hold of required text
const requiredTexts = document.querySelectorAll('.required-text')

// Get hold of password strength bar
const passwordStrengthBarContainer = document.querySelector('.password-strength-bar')

// Get hold of password bars
const passwordBars = document.querySelectorAll('.password-bar')

// Regular expressions to determine password strength
const mediumPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])')
const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

// Get hold of passwords match container which can display a message
const passwordMatchContainer = document.querySelector('.passwords-match')

// Get hold of container to display message to user
const informationText = document.querySelector('.information-text')

// Get hold of the register button
const registerUserButton = document.querySelector('#register-user-btn')

const checkPasswordStrength = password => {
    if (strongPassword.test(password)) {
        passwordStrengthBarContainer.style.display = 'flex'
        passwordStrengthBarContainer.style.justifyContent = 'space-around'
        // Remove red and yellow bars, show green bar
        passwordBars.forEach((bar, index) => {
            if (bar.classList.contains('red-bar') || bar.classList.contains('yellow-bar')) {
                bar.classList.remove('red-bar')
                bar.classList.remove('yellow-bar')
            }
            bar.classList.add('green-bar')
        })
    } else if (mediumPassword.test(password)) {
        passwordStrengthBarContainer.style.display = 'flex'
        passwordStrengthBarContainer.style.justifyContent = 'space-around'
        // Remove red and green bars, show yellow bars
        passwordBars.forEach((bar, index) => {
            if (bar.classList.contains('red-bar') || bar.classList.contains('green-bar')) {
                bar.classList.remove('red-bar')
                bar.classList.remove('green-bar')
            }

            if (index !== 2) {
                bar.classList.add('yellow-bar')
            }
        })
    } else {
        passwordStrengthBarContainer.style.display = 'flex'
        passwordStrengthBarContainer.style.justifyContent = 'space-around'
        // Add red bar
        return passwordBars[0].classList.add('red-bar')
    }
}

// Compares passwords
const verifyPasswordsMatch = (password, confirmPassword) => {
    if (confirmPassword.length === 0) return

    if (password === confirmPassword) {
        passwordMatchContainer.style.display = 'block'
        informationText.innerText = 'Password confirmed'
        informationText.classList.add('green-text')

        if (inputUsername.value.length != 0 && inputIncome.value.length != 0) {
            registerUserButton.classList.remove('disabled-btn')
        }
    } else {
        passwordMatchContainer.style.display = 'block'
        informationText.innerHTML = 'Password do not match'
        informationText.classList.remove('green-text')
        informationText.classList.add('red-text')
    }
}

// Verify if inputs are filled
const verifyInputFilled = input => {
    if (input.value.length === 0) {
        input.style.borderColor = '#dc3545'
        registerUserButton.classList.add('disabled-btn')

        switch(input.name) {
            case 'username':
                requiredTexts[0].style.display = 'block'
                break
            case 'income':
                requiredTexts[1].style.display = 'block'
                break
            case 'password':
                requiredTexts[2].style.display = 'block'
                break
            case 'confirmation':
                requiredTexts[3].style.display = 'block'
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
            case 'income':
                requiredTexts[1].style.display = 'none'
                break
            case 'password':
                requiredTexts[2].style.display = 'none'
                break
            case 'confirmation':
                requiredTexts[3].style.display = 'none'
                break
            default:
                break
        }
    }

    if (
        inputUsername.value.length != 0
        && inputIncome.value.length != 0
        && inputPassword.value.length != 0
        && inputConfirmPassword.value.length != 0
        && inputPassword.value === inputConfirmPassword.value
    ) {
        registerUserButton.classList.remove('disabled-btn')
        requiredTexts.forEach(text => text.style.display = 'none')
    }
}

// Prevents submission on form when values are empty
const preventSubmitOnEnter = event => {
    if (
        inputUsername.value.length != 0
        && inputIncome.value.length != 0
        && inputPassword.value.length != 0
        && inputConfirmPassword.value.length != 0
        && inputPassword.value === inputConfirmPassword.value
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
            case 'income':
                if (inputIncome.value.length === 0) {
                    inputIncome.style.borderColor = '#dc3545'
                    requiredTexts[1].style.display = 'block'
                }
                break
            case 'password':
                if (inputPassword.value.length === 0) {
                    inputPassword.style.borderColor = '#dc3545'
                    requiredTexts[2].style.display = 'block'
                }
                break
            case 'confirmation':
                if (inputConfirmPassword.value.length === 0) {
                    inputConfirmPassword.style.borderColor = '#dc3545'
                    requiredTexts[3].style.display = 'block'
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
            case 'income':
                if (inputIncome.value.length === 0) {
                    inputIncome.style.borderColor = '#ced4da'
                    requiredTexts[1].style.display = 'none'
                }
                break
            case 'password':
                if (inputPassword.value.length === 0) {
                    inputPassword.style.borderColor = '#ced4da'
                    requiredTexts[2].style.display = 'none'
                }
                break
            case 'confirmation':
                if (inputConfirmPassword.value.length === 0) {
                    inputConfirmPassword.style.borderColor = '#ced4da'
                    requiredTexts[3].style.display = 'none'
                }
                break
            default:
                break
        }
    }

    if (
        inputUsername.value.length != 0
        && inputIncome.value.length != 0
        && inputPassword.value.length != 0
        && inputConfirmPassword.value.length != 0
        && inputPassword.value === inputConfirmPassword.value
    ) {
        registerUserButton.classList.remove('disabled-btn')
        requiredTexts.forEach(text => text.style.display = 'none')
    }
}


// Event listener for form to avoid submit on enter
form.addEventListener('keypress', (event) => event.key === 'Enter' ? preventSubmitOnEnter(event) : null)
// Verify fields of form if user presses tab
form.addEventListener('keydown', (event) => event.key === 'Tab' ? verifyOnTab(event) : null)

// Mouse out events
inputUsername.addEventListener("mouseout", () => verifyInputFilled(inputUsername))

inputIncome.addEventListener("mouseout", () => verifyInputFilled(inputIncome))

inputPassword.addEventListener("mouseout", () => verifyInputFilled(inputPassword))

inputConfirmPassword.addEventListener("mouseout", () => verifyInputFilled(inputConfirmPassword))

// Input events
inputPassword.addEventListener("input", function verifyPasswordInput() {
    checkPasswordStrength(inputPassword.value)
    verifyPasswordsMatch(inputPassword.value, inputConfirmPassword.value)

    // When password length is 0, remove bars
    if (inputPassword.value.length === 0) {
        passwordStrengthBarContainer.style.display  = 'none'
        passwordBars.forEach(bar => {
            if (bar.classList.contains('red-bar')) bar.classList.remove('red-bar')
            if (bar.classList.contains('yellow-bar')) bar.classList.remove('yellow-bar')
            if (bar.classList.contains('green-bar')) bar.classList.remove('green-bar')
        })
    }
})

inputConfirmPassword.addEventListener("input", function verifyPasswordConfirm() {
    verifyPasswordsMatch(inputPassword.value, inputConfirmPassword.value)

    // When confirm password length is 0, remove text and bars
    if (inputConfirmPassword.value.length === 0) {
        passwordMatchContainer.style.display = 'none'
        informationText.innerHTML = ''
        informationText.classList.remove('red-text')
        informationText.classList.remove('green-text')
    }
})
