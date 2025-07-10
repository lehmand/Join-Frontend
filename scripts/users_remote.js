async function registerUser(endpoint, user) {
	const url = `http://127.0.0.1:8001/auth/${endpoint}/`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		if (!response.ok) {
			throw new Error(`Failed to register user: ${response.status}`);
		}

		return await response.json();
	} catch (err) {
		console.error('Error registering user: ', err);
		return { error: err.message };
	}
}

/**
 * Logs in a user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @param {boolean} [guest=false] - Indicates whether to use a Guest Account (optional, default is false).
 * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating whether the login was successful.
 */
async function logIn(email, password) {
	const url = 'http://127.0.0.1:8001/auth/login/';

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: email,
				password: password,
			}),
		});

		if (!response.ok) {
			throw new Error(`Failed to log in: ${response.status}`);
		}
		const data = await response.json();
		const token = data.token;
		const username = data.username;
		const userId = data.id;
		localStorage.setItem('token', token);
		localStorage.setItem('user', username);
		localStorage.setItem('userId', userId);
		return true;
	} catch (err) {
		console.error('Error logging in:', err);
		return false;
	}
}

/**
 * Checks if a user is logged in.
 * @returns {boolean} A boolean indicating whether a user is logged in.
 */
function isLoggedIn() {
	if (localStorage.getItem('token') !== null) return true;
	return false;
}

/**
 * Logs out the user.
 */
function logOut() {
	if (isLoggedIn()) {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		localStorage.removeItem('userId');
	}
	return true;
}

/**
 * Retrieves the logged-in user data stored in local storage.
 * @returns {string|null} The user data stored in local storage or null if none exists.
 */
function getLoggedInUser() {
	return localStorage.getItem('user');
}

function getLoggedInUserId() {
	return localStorage.getItem('userId');
}

function getToken() {
	return localStorage.getItem('token');
}
