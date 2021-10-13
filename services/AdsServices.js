import RequestServices from "./RequestServices.js"

export default {
    getAds: async function() {
        return await RequestServices.getAll()
    },

    getAd: async function(id) {
        return await RequestServices.getOne(id)
    },

    createAd: async function(body) {
        const path = 'api/ads'
        if (body.adphoto !== '') {
            const imgName = body.adphoto
            body.adphoto = this.parseURLimage(imgName)
        }
        await RequestServices.post(body, path)
    },

    deleteAd: async function(id) {
        return await RequestServices.delete(id)
    },

    parseURLimage(imgName) {
        return `./public/images/${imgName}`
    },
}