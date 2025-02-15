/**
 * Retrieves task data from remote storage.
 * @returns {Array} An array of user objects or an empty array if an error occurs.
 */
async function getContacts() {
    const url = 'http://127.0.0.1:8000/api/contacts/'
    const token = getToken()

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            }
        });
        const data = await response.json();
        return data
    } catch(err) {
        console.error('Loading contacts failed: ', err)
    }
}
