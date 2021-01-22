import { uuidv4 } from "./helpers/functions.js";

const firstNameEl = document.querySelector('#firstName');
const lastNameEl = document.querySelector('#lastName');
const emailEl = document.querySelector('#email');
const phoneNumberEl = document.querySelector('#phoneNumber');
const addressEl = document.querySelector('#address');
const cityEl = document.querySelector('#city');
const zipCodeEl = document.querySelector('#zipCode');
const id = uuidv4();

const form = document.querySelector('#signup');

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

const isPhoneValid = (phone) => { // samma för telefon nummer, får den inte riktigt att stämma så den validerar direkt som alla andra fält
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



form.addEventListener('submit', function (event) {
    event.preventDefault();

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

    if (isFormValid) { // När allt är validerat och korrekt så skapar jag listan här
        userData = new User(`${uuidv4()}`,`${firstName.value}`, `${lastName.value}`, `${email.value}`, `${phoneNumber.value}`, `${address.value}`,`${city.value}`, `${zipCode.value}`)
        users.push(userData);
        document.getElementById('userInfoText').innerText = "User created!"
        document.getElementById('userInfoTextRed').innerText = ""
        
        createElement()
        fillPanel()
        $("#signup")[0].reset();
        // console.log(users)
    }
    else {
       document.getElementById('userInfoTextRed').innerText = "All fields must be filled correctly!";
       document.getElementById('userInfoText').innerText = "";
    }
});

const debounce = (fn, delay = 500) => { // För att få en liten fördröjning på när den validerar så kör jag denna function
    let timeoutId;
    return (...args) => {
        
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
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
let userData;

let userDiv;
let flipDiv;
let panelDiv;

function createElement () {  // Här skapar jag elementen som ska vara i listan
    userDiv = document.createElement('div')
    flipDiv = document.createElement('div')
    panelDiv = document.createElement('div')

    flipDiv.className = "flip"
    panelDiv.className = "panel"
    
    flipDiv.innerText = `${userData.firstname}` + ` ${userData.lastname}`

    var currentDiv = document.getElementById('result')
    currentDiv.appendChild(userDiv)
    userDiv.appendChild(flipDiv)
    userDiv.appendChild(panelDiv)
}

function fillPanel() {
    var idElement = document.createElement("p")
    idElement.innerText = `Id: ${userData.id}`
  
    var emailElement = document.createElement("p")
    emailElement.innerText = `E-mail: ${userData.email}`
    
    var phoneElement = document.createElement("p")
    phoneElement.innerText = `Phone: ${userData.phonenumber}`
    
    var addressElement = document.createElement("p")
    addressElement.innerText = `Address: ${userData.address}, ${userData.zip} ${userData.city}`
  
    panelDiv.appendChild(idElement)
    panelDiv.appendChild(emailElement)
    panelDiv.appendChild(phoneElement)
    panelDiv.appendChild(addressElement)
}

// JQuery
$("body").delegate(".flip", "click", function(){
    $('.panel').not($(this).next(".panel").slideToggle("slow")).slideUp("slow");
  });
    $("#subBtn").click(function() {
        $("#result").append();
});