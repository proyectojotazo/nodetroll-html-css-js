const URL = 'http://localhost:8000/'

export default {
    post: async function(path, username, password) {
        const url = `${URL}${path}`
        const requestConfig = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        }
        try {
            const response = await fetch(url, requestConfig)
            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                throw new Error(data.message)
            }
        } catch (e) {
            throw e
        }
    },

    registerUser: async function(username, password) {
        const path = 'auth/register'
        return await this.post(path, username, password)
    },

    loginUser: async function(username, password) {
        const path = 'auth/login'
        const { accessToken: token } = await this.post(path, username, password)
        localStorage.setItem('token', token)
    }
}