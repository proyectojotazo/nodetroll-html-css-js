import { modalView } from "../public/js/views.js"
import PubSub from "../services/PubSub.js"

export default class ModalController {
    constructor(element) {
        this.element = element

        PubSub.subscribe(PubSub.events.SHOW_ERROR, error => {
            this.showError(error)
        })

        PubSub.subscribe(PubSub.events.SHOW_SUCCESS, () => {
            this.showSuccess()
        })
    }

    attachEventCloseListener() {
        const btnClose = this.element.querySelector('button')
        btnClose.addEventListener('click', () => {
            this.element.classList.remove('active')
        })
    }

    showError(error) {
        const message =
            error.message === 'Username is taken' ?
            'Usuario ya registrado' :
            error.message === 'Failed to fetch' ?
            'Error al enviar la petición' :
            error.message

        const data = {
            title: 'ERROR',
            message
        }

        this.element.innerHTML = modalView(data, false, true)

        this.element.classList.add('active')

        this.attachEventCloseListener()
    }

    showSuccess() {
        const data = {
            title: 'EXITO',
            message: 'El usuario se ha registrado con éxito'
        }

        this.element.innerHTML = modalView(data, true)

        this.element.classList.add('active')

        this.attachEventCloseListener()
    }
}