// read form element
const form = document.getElementById('form');
const Benutzername = document.getElementById('Benutzername');
const Email = document.getElementById('Email');
const Passwort = document.getElementById('Passwort');
const Telefonnummer = document.getElementById('Telefonnummer');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email ist nicht gültig');
  }
}

// Check phonennumber is valid
function checkTelefonnummer(input) {
  const re = /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Telefonnummer ist nicht gültig');
  }
}

// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} ist erforderlich`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Validate form input elements
function validateForm() {
  if (!checkRequired([Benutzername, Email, Passwort, Telefonnummer])) {
    checkLength(Benutzername, 3, 15);
    checkLength(Passwort, 6, 25);
    checkEmail(Email);
    checkTelefonnummer(Telefonnummer);
  }
}


/**
 * Send form data to server
 * Info: https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
 */
function sendForm() {
  const SERVER = "http://localhost:3000";
  fetch(SERVER + '/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        Benutzername: Benutzername,
        Email: Email,
      }
    })
  });

}


// Event listeners
form.addEventListener('submit', function (e) {
  //https://www.w3schools.com/jsref/event_preventdefault.asp
  e.preventDefault();
  //First validate form
  validateForm();
  //Send Data
  sendForm();
});
