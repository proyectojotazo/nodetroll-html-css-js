import InputsConfig from "../services/InputsConfig.js"
import PubSub from "../services/PubSub.js"
import UsersServices from "../services/UsersServices.js"
import InputController from "./InputController.js"

const { userName, password } = InputsConfig.register

export default class RegisterController {

    constructor(element) {
        this.element = element

        this.inputUserName = new InputController(this.element.querySelector('input[name="username"]'), userName)
        this.inpPass = new InputController(this.element.querySelector('input[name="password"]'), password)
        this.inpPassRep = new InputController(this.element.querySelector('input[name="passwordRepeat"]'), password)

        this.inputsList = [this.inputUserName, this.inpPass, this.inpPassRep]

        this.attachEvents()

    }

    attachEvents() {
        this.element.addEventListener('submit', e => {
            e.preventDefault()
            this.registerUser()
        })

        this.goIndexEventButton()
        this.toogleActiveButton()
    }

    async registerUser() {
        if (this.validFields()) {
            const { username, password } = this.getInputsData()
            PubSub.publish(PubSub.events.SHOW_LOADER)
            this.disableInputs()
            try {
                await UsersServices.registerUser({ username, password })
                PubSub.publish(PubSub.events.SHOW_SUCCESS, 'El usuario se ha registrado con éxito')
            } catch (error) {
                PubSub.publish(PubSub.events.SHOW_ERROR, error)
                this.enableInputs()
            } finally {
                PubSub.publish(PubSub.events.HIDE_LOADER)

                this.resetInputs()
            }
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


    validFields() {

        const validUser = this.inputUserName.isValid()
        const validPass = this.inpPass.isValid()
        const validPassRep = this.inpPassRep.isValid()

        if (validPass && validPassRep) {
            return this.samePass()
        }

        return (validUser && validPass && validPassRep)
    }

    samePass() {
        const validSamePass = this.inpPass.getValue() === this.inpPassRep.getValue()

        const errMsg = 'Las contraseñas no coinciden'

        if (!validSamePass) {
            this.inpPass.showError(errMsg)
            this.inpPassRep.showError(errMsg)
        }

        return validSamePass
    }

    getInputsData() {
        return {
            username: this.inputUserName.getValue(),
            password: this.inpPass.getValue()
        }
    }

    resetInputStyles() {
        this.inputsList.forEach(input => input.resetStyles())
    }

    resetInputs() {
        this.resetInputStyles()
        this.inputsList.forEach(input => input.resetValue())
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

}