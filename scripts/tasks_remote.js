/**
 * Retrieves task data from remote storage.
 * @returns {Array} An array of user objects or an empty array if an error occurs.
 */
async function getTasks() {
	const url = 'http://127.0.0.1:8001/api/tasks';
	const token = getToken();
	try {
		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
}
