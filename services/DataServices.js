const URL = 'http://localhost:8000/'

export default {
    getAds: async function() {
        const path = 'api/ads'
        const url = `${URL}${path}`
        debugger
        try {
            const response = await fetch(url)
            const data = await response.json()
            if (response.ok) return data
            else {
                if (Object.entries(data).length === 0) {
                    //Error que se genera al no tener en el db.json la propiedad 'ads'
                    data.message = 'Error en el servidor'
                }
                throw new Error(data.message)
            }
        } catch (error) {
            throw error
        }


    },
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
        if (adData.adphoto !== '') {
            const imgName = adData.adphoto
            adData.adphoto = this.parseURLimage(imgName)
        }
        return await this.post(path, adData)
    },

    parseURLimage(imgName) {
        return `./public/images/${imgName}`
    },

    isAuthenticated() {
        return localStorage.getItem('token') !== null
    }
}