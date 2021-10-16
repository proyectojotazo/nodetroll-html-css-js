import PubSub from "../services/PubSub.js"
import UsersServices from "../services/UsersServices.js"
import InputController from "./InputController.js"

export default class LoginController {
    constructor(element) {
        this.element = element

        this.inputUserName = new InputController(this.element.querySelector('input[name="username"]'))
        this.inpPass = new InputController(this.element.querySelector('input[name="password"]'))

        this.inputsList = [this.inputUserName, this.inpPass]

        this.attachEvents()
    }

    attachEvents() {
        this.element.addEventListener('submit', e => {
            e.preventDefault()
            this.loginUser()
        })
        this.goIndexEventButton()
        this.toogleActiveButton()
    }

    async loginUser() {
        const { username, password } = this.getInputsData()
        const next = this.getNext()
        PubSub.publish(PubSub.events.SHOW_LOADER)
        this.disableInputs()
        try {
            await UsersServices.loginUser({ username, password })
            PubSub.publish(PubSub.events.SHOW_LOGGED, { username, next })
        } catch (error) {
            PubSub.publish(PubSub.events.SHOW_ERROR, error)
            this.enableInputs()
        } finally {
            PubSub.publish(PubSub.events.HIDE_LOADER)
            this.resetInputs()
        }
    }

    goIndexEventButton() {

        this.element.querySelector('#back').addEventListener('click', e => {
            e.preventDefault()
            window.location.href = '/'
        })
    }

    toogleActiveButton() {
        this.inputsList.forEach(inp => {
            inp.element.addEventListener('input', () => {
                const activateButton = this.inputsList.every(input => input.getValue() !== '')
                if (activateButton) {
                    this.element.querySelector('button[type="submit"]').removeAttribute('disabled')
                } else {
                    this.element.querySelector('button[type="submit"]').setAttribute('disabled', true)
                }
            })
        })
    }

    getInputsData() {
        return {
            username: this.inputUserName.getValue(),
            password: this.inpPass.getValue()
        }
    }

    disableInputs() {
        this.inputsList.forEach(input => input.disable())
        this.element.querySelector('button').setAttribute('disabled', true)
        this.element.querySelector('#back').setAttribute('disabled', true)
    }

    enableInputs() {
        this.inputsList.forEach(input => input.enable())
        this.element.querySelector('#back').removeAttribute('disabled')
    }

    resetInputs() {
        this.inputsList.forEach(input => {
            input.resetValue()
            input.resetStyles()
        })
    }

    getNext() {
        /**
         * Al intentar crear un anuncio sin estar logeado nos pasará 'next=createad.html'
         * si no, la redirección será siempre a index.html
         */
        return new URLSearchParams(window.location.search).get('next') || '/'
    }
}