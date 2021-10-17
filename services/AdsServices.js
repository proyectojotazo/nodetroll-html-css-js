import RequestServices from "./RequestServices.js"

export default {
    getAds: async function() {
        const ads = await RequestServices.getAll()
        return this.checkHtmlInyection(ads)
    },

    getAd: async function(id) {
        const ad = await RequestServices.getOne(id)
        return this.checkHtmlInyection([ad])[0]
    },

    searchAd: async function(adName) {
        const data = await RequestServices.getSearch(adName)
        return data.length > 0 ? this.checkHtmlInyection(data) : data
    },

    createAd: async function(body) {
        const path = 'api/ads'
        await RequestServices.post(body, path)
    },

    deleteAd: async function(id) {
        return await RequestServices.delete(id)
    },

    checkHtmlInyection(ads) {
        return ads.map(ad => this.parseAd(ad))
    },

    parseAd(ad) {
        ad.adname = this.replaceHtml(ad.adname)
        ad.adphoto = this.replaceHtml(ad.adphoto)
        ad.adPrice = this.replaceHtml(ad.adPrice)
        ad.sellbuy = this.replaceHtml(ad.sellbuy)

        return ad
    },

    replaceHtml(adProperty) {
        return adProperty.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }

}