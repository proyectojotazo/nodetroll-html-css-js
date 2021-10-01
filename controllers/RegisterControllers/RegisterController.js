import { InputControllerUserName, InputControllerPassword } from "./InputController.js"
import DataServices from "../../services/DataServices.js"
import PubSub from "../../services/PubSub.js"

export default class RegisterController {
    constructor(element) {
        this.element = element

        this.inputUserName = new InputControllerUserName(this.element.querySelector('input[name="username"]'))
        this.inpPass = new InputControllerPassword(document.querySelector('input[name="password"]'))
        this.inpPassRep = new InputControllerPassword(document.querySelector('input[name="passwordRepeat"]'))

        this.inputsList = [this.inputUserName, this.inpPass, this.inpPassRep]

        this.attachEvents()

    }

    attachEvents() {
        this.element.addEventListener('submit', async(e) => {
            e.preventDefault()
            if (this.validFields()) {
                const userName = this.inputUserName.getValue()
                const password = this.inpPass.getValue()
                PubSub.publish(PubSub.events.SHOW_LOADER)
                this.disableInputs()
                try {
                    await DataServices.registerUser(userName, password)
                    PubSub.publish(PubSub.events.SHOW_SUCCESS)
                } catch (error) {
                    PubSub.publish(PubSub.events.SHOW_ERROR, error)
                } finally {
                    PubSub.publish(PubSub.events.HIDE_LOADER)
                    this.enableInputs()
                    this.resetInputs()
                    this.resetInputStyles()

                }
            } else {
                console.log('Ha ocurrido un error')
            }
        })

        this.toogleActiveButton()
    }

    validFields() {

        const validUser = this.inputUserName.isValidUserName()
        const validPass = this.inpPass.isValidPass()
        const validPassRep = this.inpPassRep.isValidPass()
        const samePass = this.inpPass.samePasswordTo(this.inpPassRep.getValue())

        // Comprobamos el nombre del usuario
        this.checkField(validUser, this.inputUserName)
            // Comprobamos la contraseña
        this.checkField(validPass, this.inpPass)
            // Comprobamos la repetición de la contraseña
        this.checkField(validPassRep, this.inpPassRep)

        // Comprobamos que coincidan las contraseñas

        if ((validPass && validPassRep) && !samePass) {
            this.inpPass.showError('Las contraseñas no coinciden')
            this.inpPassRep.showError('Las contraseñas no coinciden')
        }

        return (validUser && validPass && validPassRep && samePass)
    }

    checkField(validate, field) {
        if (!validate) field.showError()
        else field.showSuccess()
    }

    resetInputStyles() {
        this.inputsList.forEach(input => input.resetStyles())
    }

    resetInputs() {
        this.inputsList.forEach(input => input.resetValue())
    }

    disableInputs() {
        this.inputsList.forEach(input => input.disable())
        this.element.querySelector('button').setAttribute('disabled', true)
    }

    enableInputs() {
        this.inputsList.forEach(input => input.enable())
    }

    toogleActiveButton() {
        this.inputsList.forEach(inp => {
            inp.element.addEventListener('input', () => {
                const activateButton = this.inputsList.every(input => input.getValue() !== '')
                if (activateButton) {
                    this.element.querySelector('button').removeAttribute('disabled')
                } else {
                    this.element.querySelector('button').setAttribute('disabled', true)
                }
            })
        })
    }
}