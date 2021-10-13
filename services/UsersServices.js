import RequestServices from "./RequestServices.js"

export default {
    loginUser: async function(userData) {
        const path = 'auth/login'
        const { accessToken: token } = await RequestServices.post(userData, path)
        localStorage.setItem('token', token)
    },

    registerUser: async function(userData) {
        const path = 'auth/register'
        await RequestServices.post(userData, path)
    }
}