import { adCardViewDetail } from "../../public/js/views.js"
import AdsServices from "../../services/AdsServices.js"
import PubSub from "../../services/PubSub.js"

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

            this.deleteButtonEvent()
        } catch (error) {
            PubSub.publish(PubSub.events.SHOW_ERROR, error)
            this.showAdNotFound()
        } finally {
            PubSub.publish(PubSub.events.HIDE_LOADER)
        }
    }

    createCard(ad) {
        const divCard = document.createElement('div')
        const btnBack = this.createBackButton()
        divCard.classList.add('card', 'w-25', 'm-2', 'mx-auto')
        divCard.innerHTML = adCardViewDetail(ad)
        divCard.appendChild(btnBack)

        return divCard
    }

    deleteButtonEvent() {
        const deleteButton = document.querySelector('.delete')

        if (deleteButton) {
            deleteButton.addEventListener('click', async() => {
                // TODO: Hacer un modal y cambiar confirm
                const deleteAd = confirm('Está seguro que desea borrar este anuncio?')
                if (deleteAd) {
                    PubSub.publish(PubSub.events.SHOW_LOADER)
                    try {
                        await AdsServices.deleteAd(this.adId)
                        PubSub.publish(PubSub.events.SHOW_SUCCESS, 'El anuncio se ha borrado correctamente!')
                            // TODO: Mirar que la redirección no sea tan directa
                        window.location.href = '/'
                    } catch (error) {
                        PubSub.publish(PubSub.events.SHOW_ERROR, error)
                    } finally {
                        PubSub.publish(PubSub.events.HIDE_LOADER)

                    }
                }
            })
        }

    }

    showAdNotFound() {
        const wrapperNotFound = this.createWrapperNotFoundElements()

        this.element.appendChild(wrapperNotFound)
    }

    createWrapperNotFoundElements() {
        const wrapper = document.createElement('div')
        wrapper.classList.add('d-flex', 'flex-column', 'w-50', 'mx-auto')

        const h3 = this.createNotFoundMsgNode()
        const btn = this.createBackButton()

        wrapper.append(h3, btn)

        return wrapper
    }

    createNotFoundMsgNode() {
        const msg = 'Anuncio no encontrado'
        const node = document.createElement('h3')

        node.classList.add('text-center', 'mt-2')
        node.innerText = msg

        return node
    }

    createBackButton() {
        const btnBack = document.createElement('button')
        btnBack.classList.add('btn', 'btn-danger', 'my-2', 'w-75', 'mx-auto')
        btnBack.innerText = 'Volver'

        btnBack.addEventListener('click', () => {
            window.location.href = '/'
        })

        return btnBack
    }

}