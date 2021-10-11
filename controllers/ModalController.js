import { modalView } from "../public/js/views.js"
import PubSub from "../services/PubSub.js"

export default class ModalController {
    constructor(element) {
        this.element = element

        PubSub.subscribe(PubSub.events.SHOW_ERROR, error => {
            this.showError(error)
        })

        PubSub.subscribe(PubSub.events.SHOW_SUCCESS, msg => {
            this.showSuccess(msg)
        })

        PubSub.subscribe(PubSub.events.SHOW_LOGGED, params => {
            const { username, next } = params
            this.showLogged(username, next)
        })
    }

    attachEventCloseListener(next = '') {
        const btnClose = this.element.querySelector('button')
        btnClose.addEventListener('click', () => {
            this.element.classList.remove('active')
            if (next !== '') {
                // TODO: Ponerlo en un lugar mas adecuado  
                window.location.href = next
            }
        })
    }

    showError(error, next = '') {
        const message =
            error.message === 'Username is taken' ?
            'Usuario ya registrado' :
            error.message === 'Failed to fetch' ?
            'Error al enviar la petición' :
            error.message === 'Wrong username/password' ?
            'Usuario y/o contraseña incorrectos' :
            error.message === 'Unexpected token < in JSON at position 0' ?
            'Ruta incorrecta' :
            error.message === 'Wrong access token' ?
            'Se necesita estar registrado' :
            error.message

        // TODO: Ponerlo en un lugar mas adecuado    
        if (message === 'Se necesita estar registrado') next = '?next=login.html'

        const data = {
            title: 'ERROR',
            message
        }

        this.element.innerHTML = modalView(data, false, true)

        this.element.classList.add('active')

        this.attachEventCloseListener(next)
    }

    showSuccess(msg) {
        const data = {
            title: 'ÉXITO',
            message: msg
        }

        this.element.innerHTML = modalView(data, true)

        this.element.classList.add('active')

        this.attachEventCloseListener()
    }

    showLogged(username, next) {
        const data = {
            title: 'ÉXITO',
            message: `Bienvenido, ${username}`
        }

        this.element.innerHTML = modalView(data, true)

        this.element.classList.add('active')

        this.attachEventCloseListener(next)
    }
}