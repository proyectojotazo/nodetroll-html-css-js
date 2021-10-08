import DataServices from "../../services/DataServices.js"
import PubSub from "../../services/PubSub.js"
import LoginInputController from "./LoginInputController.js"

export default class LoginController {
    constructor(element) {
        this.element = element

        this.inputUserName = new LoginInputController(this.element.querySelector('input[name="username"]'))
        this.inpPass = new LoginInputController(document.querySelector('input[name="password"]'))

        this.inputsList = [this.inputUserName, this.inpPass]

        this.attachEvents()
    }

    attachEvents() {
        this.element.addEventListener('submit', e => {
            e.preventDefault()
            this.loginUser()
        })
    }

    async loginUser() {
        if (this.validFields()) {
            const { username, password } = this.getInputsData()
            const next = this.getNext()
            PubSub.publish(PubSub.events.SHOW_LOADER)
            this.disableInputs()
            try {
                await DataServices.loginUser(username, password)
                PubSub.publish(PubSub.events.SHOW_LOGGED, { username, next })
            } catch (error) {
                PubSub.publish(PubSub.events.SHOW_ERROR, error)
            } finally {
                PubSub.publish(PubSub.events.HIDE_LOADER)
                this.enableInputs()
                this.resetInputs()
            }
        }
    }

    validFields() {
        const validUser = this.inputUserName.getValue() !== ''
        const validPass = this.inpPass.getValue() !== ''

        this.checkField(validUser, this.inputUserName)
        this.checkField(validPass, this.inpPass)

        return validUser && validPass
    }

    checkField(validate, field) {
        if (!validate) field.showError()
        else field.showSuccess()
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
    }

    enableInputs() {
        this.inputsList.forEach(input => input.enable())
        this.element.querySelector('button').removeAttribute('disabled')
    }

    resetInputs() {
        this.inputsList.forEach(input => {
            input.resetValue()
            input.resetStyles()
        })
    }

    getNext() {
        return new URLSearchParams(window.location.search).get('next') || '/'
    }
}