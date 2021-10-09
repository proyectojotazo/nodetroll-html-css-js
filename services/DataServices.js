const URL = 'http://localhost:8000/'

export default {
    post: async function(path, body) {
        const url = `${URL}${path}`
        const requestConfig = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        if (this.isAuthenticated()) {
            const token = localStorage.getItem('token')
            requestConfig.headers['Authorization'] = `Bearer ${token}`
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

    registerUser: async function(userData) {
        const path = 'auth/register'
        return await this.post(path, userData)
    },

    loginUser: async function(userData) {
        const path = 'auth/login'
        const { accessToken: token } = await this.post(path, userData)
        localStorage.setItem('token', token)
    },

    createAd: async function(adData) {
        const path = 'api/ads'
        return await this.post(path, adData)
    },

    isAuthenticated() {
        return localStorage.getItem('token') !== null
    },
}