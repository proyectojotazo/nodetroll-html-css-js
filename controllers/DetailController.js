import { adCardViewDetail, adCardViewDetailNotFound } from "../public/js/views.js"
import AdsServices from "../services/AdsServices.js"
import PubSub from "../services/PubSub.js"

export default class DetailController {
    constructor(element, adId) {
        this.element = element
        this.adId = adId
        this.showDetailAd(this.adId)
    }

    async showDetailAd() {
        PubSub.publish(PubSub.events.SHOW_LOADER)
        try {
            const ad = await AdsServices.getAd(this.adId)
            const adCard = this.createCard(ad)

            this.element.append(adCard)

        } catch (error) {
            PubSub.publish(PubSub.events.SHOW_ERROR, error)
            this.showAdNotFound()
        } finally {
            PubSub.publish(PubSub.events.HIDE_LOADER)
            this.attachButtonEvents()
        }
    }

    createCard(ad) {
        const divCard = document.createElement('div')

        divCard.classList.add('card', 'w-25', 'm-2', 'mx-auto')
        divCard.innerHTML = adCardViewDetail(ad)

        return divCard
    }

    showAdNotFound() {
        const wrapperNotFound = this.createWrapperNotFoundElements()

        this.element.append(wrapperNotFound)
    }

    createWrapperNotFoundElements() {
        const wrapper = document.createElement('div')
        wrapper.classList.add('d-flex', 'flex-column', 'w-50', 'mx-auto')

        wrapper.innerHTML = adCardViewDetailNotFound()

        return wrapper
    }

    disableInputs() {
        const deletebtn = this.element.querySelector('.delete')
        const backBtn = this.element.querySelector('#btn-back')

        deletebtn.setAttribute('disabled', true)
        backBtn.setAttribute('disabled', true)
    }

    attachButtonEvents() {
        this.deleteButtonEvent()
        this.eventBackButton()
    }

    deleteButtonEvent() {
        const deleteButton = document.querySelector('.delete')

        if (deleteButton) {
            deleteButton.addEventListener('click', async() => {
                // TODO: Hacer un modal y cambiar confirm
                const deleteAd = confirm('Está seguro que desea borrar este anuncio?')
                if (deleteAd) {
                    PubSub.publish(PubSub.events.SHOW_LOADER)
                    this.disableInputs()
                    try {
                        await AdsServices.deleteAd(this.adId)
                        PubSub.publish(PubSub.events.SHOW_SUCCESS, 'El anuncio se ha borrado correctamente!')
                    } catch (error) {
                        PubSub.publish(PubSub.events.SHOW_ERROR, error)
                    } finally {
                        PubSub.publish(PubSub.events.HIDE_LOADER)

                    }
                }
            })
        }

    }

    eventBackButton() {
        const btnBack = document.querySelector('#btn-back')

        btnBack.addEventListener('click', () => {
            window.location.href = '/'
        })

    }

}