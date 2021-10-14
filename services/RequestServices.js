export default {

    getAll: async function() {

        const url = this.getUrl('api/ads')
        const requestConfig = this.getRequestConfig('GET', null)
        try {
            const response = await fetch(url, requestConfig)
            const data = await response.json()

            if (response.status === 404) {
                //Error que se da cuando no existe la propiedad 'ads' en db.json
                data['message'] = 'Error en la petición'
            }

            if (response.ok) {
                return data
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            throw error
        }
    },

    getOne: async function(id) {

        // Sucede cuando la URL es: http://localhost:8000/detail.html
        if (id === null) throw new Error('Falta especificar una id')

        const url = this.getUrl(`api/ads/${id}`)
        const requestConfig = this.getRequestConfig('GET', null)
        try {
            const response = await fetch(url, requestConfig)
            const data = await response.json()

            if (response.status === 404) {
                data['message'] = `Anuncio con id: ${id} inexistente`
            }

            if (response.ok) {
                data.canBeDeleted = data.userId === this.getAuthUserId()
                return data
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            throw error
        }
    },

    request: async function(url, method, body = {}) {
        const requestConfig = this.getRequestConfig(method, body)

        try {
            const response = await fetch(url, requestConfig)
            const data = await response.json()

            if (response.ok) {
                return data
            } else {
                throw new Error(data.message)
            }

        } catch (error) {
            throw error
        }
    },

    post: async function(body, path) {
        const url = this.getUrl(path)
        return await this.request(url, 'POST', body)
    },

    delete: async function(id) {
        const url = this.getUrl(`api/ads/${id}`)
        return await this.request(url, 'DELETE')
    },

    getUrl(path) {
        return `http://localhost:8000/${path}`
    },

    getRequestConfig(method, body) {
        const requestConfig = {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
        }

        if (method !== 'GET') {
            requestConfig['body'] = JSON.stringify(body)

            if (this.isAuthenticated()) {
                const token = localStorage.getItem('token')
                requestConfig.headers['Authorization'] = `Bearer ${token}`
            }
        }

        return requestConfig
    },

    isAuthenticated() {
        return localStorage.getItem('token') !== null
    },

    getAuthUserId: function() {
        const token = localStorage.getItem('token')
        if (token === null) {
            return null
        }
        const b64Parts = token.split('.')
        if (b64Parts.length !== 3) {
            return null
        }
        const b64Data = b64Parts[1]
        try {
            const userJSON = atob(b64Data)
            const user = JSON.parse(userJSON)
            return user.userId
        } catch (error) {
            console.error('Error while decoding JWT Token', error)
            return null
        }
    }
}