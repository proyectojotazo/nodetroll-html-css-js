import { adCardView } from "../../public/js/views.js"
import AdsServices from "../../services/AdsServices.js"
import PubSub from "../../services/PubSub.js"

export default class IndexController {
    constructor(element) {
        this.element = element
        this.showAds()

        PubSub.subscribe(PubSub.events.SEARCH, params => {
            this.showSearchedAds(params)
        })
    }

    async showAds() {
        PubSub.publish(PubSub.events.SHOW_LOADER)
        try {
            const ads = await AdsServices.getAds()
            if (ads.length !== 0) {
                // Si hay anuncios pintarlos
                ads.forEach(ad => {
                    const card = this.createCard(ad)
                    this.element.appendChild(card)
                })
            } else {
                // Si no hay anuncios mostrar mensaje de que no hay anuncios
                const noAds = this.createMessageNoAds()
                this.element.appendChild(noAds)
            }

        } catch (error) {
            PubSub.publish(PubSub.events.SHOW_ERROR, error)
        } finally {
            PubSub.publish(PubSub.events.HIDE_LOADER)
        }

    }

    async showSearchedAds(params) {
        const { value, search } = params
        if (search) {
            PubSub.publish(PubSub.events.SHOW_LOADER)
            try {
                const ads = await AdsServices.searchAd(value)
                if (ads.length !== 0) {
                    // Si hay anuncios pintarlos
                    this.element.innerHTML = ''
                    ads.forEach(ad => {
                        const card = this.createCard(ad)
                        this.element.appendChild(card)
                    })

                } else {
                    // Si no hay anuncios mostrar mensaje de que no hay anuncios
                    this.element.innerHTML = ''
                    const noAds = this.createMessageNoAds()
                    this.element.appendChild(noAds)
                }
            } catch (error) {
                PubSub.publish(PubSub.events.SHOW_ERROR, error)
            } finally {
                PubSub.publish(PubSub.events.HIDE_LOADER)
            }
        } else {
            this.element.innerHTML = ''
            this.showAds()
        }
    }

    createCard(ad) {
        const divCard = document.createElement('div')
        divCard.classList.add('card', 'w-25', 'm-2')
        divCard.innerHTML = adCardView(ad)

        return divCard
    }

    createMessageNoAds() {
        const msgNoAds = document.createElement('h3')
        msgNoAds.classList.add('my-2', 'p-2')
        msgNoAds.innerText = 'No se han encontrado anuncios'

        return msgNoAds
    }

}