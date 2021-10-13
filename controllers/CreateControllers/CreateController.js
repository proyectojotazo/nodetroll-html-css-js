import AdsServices from "../../services/AdsServices.js"
import PubSub from "../../services/PubSub.js"
import { InputControllerAdFile, InputControllerAdName, InputControllerAdPrice } from "./CreateInputController.js"

export default class CreateController {
    constructor(element) {
        this.element = element

        this.inpAdName = new InputControllerAdName(this.element.querySelector('input[name="adname"]'))
        this.inpAdPrice = new InputControllerAdPrice(this.element.querySelector('input[name="adPrice"]'))
        this.inpFile = new InputControllerAdFile(document.querySelector('input[type="file"]'))
        this.radioButtons = document.querySelectorAll('input[type="radio"]')

        this.inputsList = [this.inpAdName, this.inpFile, this.inpAdPrice]

        this.attachEvents()
    }

    attachEvents() {
        this.element.addEventListener('submit', async e => {
            e.preventDefault()
            if (this.validFields()) {
                // Crea el anuncio
                const adData = this.getInputsData()
                PubSub.publish(PubSub.events.SHOW_LOADER)
                this.disableInputs()
                try {
                    await AdsServices.createAd(adData)
                    const msg = 'El anuncio se ha creado con éxito'
                    PubSub.publish(PubSub.events.SHOW_SUCCESS, msg)
                } catch (error) {
                    PubSub.publish(PubSub.events.SHOW_ERROR, error)
                } finally {
                    PubSub.publish(PubSub.events.HIDE_LOADER)
                    this.resetInputs()
                    this.enableInputs()
                }
            }
        })

        this.goIndexEventButton()
    }

    goIndexEventButton() {

        this.element.querySelector('#back').addEventListener('click', e => {
            e.preventDefault()
            window.location.href = '/'
        })
    }

    emptyInputs() {

        const emptyName = this.inpAdName.isEmpty()
        const emptyPrice = this.inpAdPrice.isEmpty()

        this.checkField(!emptyName, this.inpAdName, true)
        this.checkField(!emptyPrice, this.inpAdPrice, true)

        return [emptyName, emptyPrice].some(val => val === true)
    }

    validFields() {
        const validAdName = this.inpAdName.isValid()
        const validAdPrice = this.inpAdPrice.isValid()
        const validAdImage = this.inpFile.isValid()

        if (this.emptyInputs()) return false // Si nombre del articulo o precio está vacío siempre devolverá false
        else {
            // Comprobaciones una vez esten los campos obligatorios no vacíos
            this.checkField(validAdName, this.inpAdName)
            this.checkField(validAdImage, this.inpFile)
            this.checkField(validAdPrice, this.inpAdPrice)

            return (validAdName && validAdPrice && validAdImage)
        }
    }

    checkField(validate, field, error = false) {
        if (!validate) field.showError(error)
        else field.showSuccess()
    }

    getInputsData() {

        const data = {}

        const myForm = new FormData(this.element)

        for (const element of myForm.entries()) {
            if (element[0] === 'adphoto') {
                data[element[0]] = element[1].name
            } else {
                data[element[0]] = element[1]
            }

        }

        return data
    }

    resetInputs() {
        this.resetInputStyles()
        this.inputsList.forEach(input => input.resetValue())
    }

    resetInputStyles() {
        this.inputsList.forEach(input => input.resetStyles())
    }

    disableInputs() {
        this.inputsList.forEach(input => input.disable())
        this.radioButtons.forEach(radio => radio.setAttribute('disabled', true))
        this.element.querySelector('button').setAttribute('disabled', true)
    }

    enableInputs() {
        this.inputsList.forEach(input => input.enable())
        this.radioButtons.forEach(radio => radio.removeAttribute('disabled'))
        this.element.querySelector('button').removeAttribute('disabled')
    }
}