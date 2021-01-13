const firstNameEl = document.querySelector('#firstName');
const lastNameEl = document.querySelector('#lastName');
const emailEl = document.querySelector('#email');
const phoneNumberEl = document.querySelector('#phoneNumber');
const addressEl = document.querySelector('#address');
const cityEl = document.querySelector('#city');
const zipCodeEl = document.querySelector('#zipCode');

const form = document.querySelector('#signup');

form.addEventListener('submit', function (e)  {
    e.preventDefault(); // Hanterar så att inte sidan laddas om

})


const checkFirstName = () => {

    let valid = false;

    const min = 2,
        max = 25;

    const firstName = firstNameEl.value.trim();

    if (!isRequired(firstName)) {
        showError(firstNameEl, 'First name cannot be blank.');
    } else if (!isBetween(firstName.length, min, max)) {
        showError(firstNameEl, `First name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(firstNameEl);
        valid = true;
    }
    return valid;
};

const checkLastName = () => {

    let valid = false;

    const min = 2,
        max = 25;

    const lastName = lastNameEl.value.trim();

    if (!isRequired(lastName)) {
        showError(lastNameEl, 'Last name cannot be blank.');
    } else if (!isBetween(lastName.length, min, max)) {
        showError(lastNameEl, `Last name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(lastNameEl);
        valid = true;
    }
    return valid;
};


const checkEmail = () => {

    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPhone = () => {

    let valid = false;
    const phone = phoneNumberEl.value.trim();
    if (!isRequired(phone)) {
        showError(phoneNumberEl, 'Phone number cannot be blank.');
    } else if (!isPhoneValid(phone)) {
        showError(phoneNumberEl, 'Phone number is not valid.')
    } else {
        showSuccess(phoneNumberEl);
        valid = true;
    }
    return valid;
};

const checkAddress = () => {

    let valid = false;

    const address = addressEl.value.trim();

    if (!isRequired(address)) {
        showError(addressEl, 'Address cannot be blank.');
    
    } else {
        showSuccess(addressEl);
        valid = true;
    }
    return valid;
};

const checkCity = () => {

    let valid = false;

    const city = cityEl.value.trim();

    if (!isRequired(city)) {
        showError(cityEl, 'City cannot be blank.');
    
    } else {
        showSuccess(cityEl);
        valid = true;
    }
    return valid;
};

const checkZipCode = () => {

    let valid = false;

    const min = 5,
        max = 5;

    const zipCode = zipCodeEl.value.trim();

    if (!isRequired(zipCode)) {
        showError(zipCodeEl, 'Zipcode cannot be blank.');
    } else if (!isBetween(zipCode.length, min, max)) {
        showError(zipCodeEl, `Zipcode must be ${max} characters.`)
    } else {
        showSuccess(zipCodeEl);
        valid = true;
    }
    return valid;
};

const isEmailValid = (email) => { // Använder ett regular expression för att kolla om emailen är valid
    const emailReturn = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailReturn.test(email);
}

const isPhoneValid = (phone) => { // samma för telefon nummer
    const phoneReturn = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
    return phoneReturn.test(phone)
}

const isRequired = value => value === '' ? false : true; // returerar sant om inputet är tomt
const isBetween = (length, min, max) => length < min || length > max ? false : true; // returerar falskt om längden på texten inte är mellan min och max valuet


const showError = (input, message) => {
    
    const formField = input.parentElement;
    
    formField.classList.remove('success');
    formField.classList.add('error');

    
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    
    const formField = input.parentElement;

    
    formField.classList.remove('error');
    formField.classList.add('success');

    
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    
    e.preventDefault();

    
    let isFirstNameValid = checkFirstName(),
        isLastName = checkLastName(),
        isEmailValid = checkEmail(),
        isPhoneValid = checkPhone(),
        isAddressValid = checkAddress(),
        isCityValid = checkCity(),
        isZipCodeValid = checkZipCode();

    let isFormValid = isFirstNameValid &&
        isLastName &&
        isEmailValid &&
        isPhoneValid &&
        isAddressValid &&
        isCityValid &&
        isZipCodeValid;

    
    if (isFormValid) {

        var subButton = document.getElementById('subBtn');
        subButton.addEventListener('click', getUserInfo, false);
        
        firstNameEl.textContent = ''
    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (event) {
    switch (event.target.id) {
        case 'firstName':
            checkFirstName();
            break;
        case 'lastName':
            checkLastName();
            break;
        case 'email':
            checkEmail();
            break;
        case 'phone':
            checkPhone();
            break;
        case 'address':
            checkAddress();
            break;
        case 'city':
            checkCity();
            break;
        case 'zipCode':
            checkZipCode();
            break;
    }
}));

import User from './models/User.js'
let users = []
function getUserInfo() {

    let user = new User(`${firstNameEl.value}`, `${lastNameEl.value}`,`${emailEl.value}`, `${phoneNumberEl.value}`, `${addressEl.value}`, `${cityEl.value}`, `${zipCodeEl.value}` ); 
    
    users.push(user)
    
    let result = document.getElementById('result');
    
    console.log(user)
    console.log(users)

    result.textContent = `${user.firstname}` + `${user.lastname}` + `${user.email}` + `${user.phonenumber}` + `${user.address}` + `${user.city}` + `${user.zip}`;
    
    
    
}