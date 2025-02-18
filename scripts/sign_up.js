/**
 * Performs the sign-up process.
 * @returns {Promise<void>} A promise that resolves once the sign-up process is complete.
 */
async function signUp() {
  let passwordMatches = checkPasswords()
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let initials = getnameFirstLetters(name)
  let color = assignColor(name)

  
  let newUser = {
    username: name, 
    email: email,
    password: password
  }

  const userResponse = await registerUser('registration', newUser);


  let newContact = {
    user: userResponse.user.id,
    name: name,
    email: email,
    initials: initials,
    phone: '00', 
    color: color,
  }

  if(passwordMatches) {
    const url = 'http://127.0.0.1:8000/api/contacts/'

	try {
		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/json"
			},
			method: 'POST',
			body: JSON.stringify(newContact)
		})
		if(!response.ok){
			throw new Error('Wrong response: ', response.status)
		}
	} catch(err) {
		console.error('Adding contact failed: ', err)
	}

  showToast('Registration successfull')

  setTimeout(() => {
    window.location.href = 'index.html'
  }, 2500);
  } else {
    return false
  }


  
  
}

/**
 * Checks if the password and password confirmation match.
 * @returns {boolean} True if passwords match, false otherwise.
 */
function checkPasswords() {
  let password = document.getElementById("password");
  let passwordConfirm = document.getElementById("password-confirm");

  if (password.value == passwordConfirm.value) {
    passwordConfirm.parentElement.classList.remove("has-error");
    passwordConfirm.setCustomValidity("");
    return true;
  }

  passwordConfirm.parentElement.classList.add("has-error");
  passwordConfirm.setCustomValidity("Passwords do not match.");
  return false;
}

/**
 * Checks if the privacy policy acceptance is checked.
 * @returns {boolean} True if privacy policy is accepted, false otherwise.
 */
function checkPrivacy() {
  var acceptPp = document.getElementById("accept-pp");
  var signupButton = document.getElementById("signup-button");

  if (acceptPp.checked) {
    signupButton.disabled = false;
    return true;
  }

  signupButton.disabled = true;
  return false;
}
