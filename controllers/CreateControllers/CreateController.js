import DataServices from "../../services/DataServices.js"
import PubSub from "../../services/PubSub.js"
import { InputControllerAdName, InputControllerAdPrice } from "./CreateInputController.js"

export default class CreateController {
    constructor(element) {
        this.element = element

        this.inpAdName = new InputControllerAdName(this.element.querySelector('input[name="adname"]'))
        this.inpAdPrice = new InputControllerAdPrice(this.element.querySelector('input[name="adPrice"]'))
        this.inpFile = document.querySelector('input[type="file"]')
        this.radioButtons = document.querySelectorAll('input[type="radio"]')

        this.inputsList = [this.inpAdName, this.inpAdPrice]

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
                    await DataServices.createAd(adData)
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

        if (this.emptyInputs()) return false
        else {
            this.checkField(validAdName, this.inpAdName)
            this.checkField(validAdPrice, this.inpAdPrice)
            return (validAdName && validAdPrice)
        }
    }

    checkField(validate, field, error = false) {
        if (!validate) field.showError(error)
        else field.showSuccess()
    }

    getInputsData() {

        const adName = this.inpAdName.getValue()
        const adPhoto = this.inpFile.value
        const adPrice = this.inpAdPrice.getValue()
        const adType = this.getRadioSelected()

        return {
            adName,
            adPhoto,
            adPrice,
            adType
        }
    }

    getRadioSelected() {
        return [...this.radioButtons].filter(radio => radio.checked === true)[0].value
    }

    resetInputs() {
        this.resetInputStyles()
        this.inputsList.forEach(input => input.resetValue())
        this.inpFile.value = ''
    }

    resetInputStyles() {
        this.inputsList.forEach(input => input.resetStyles())
    }

    disableInputs() {
        this.inputsList.forEach(input => input.disable())
        this.inpFile.setAttribute('disabled', true)
        this.radioButtons.forEach(radio => radio.setAttribute('disabled', true))
        this.element.querySelector('button').setAttribute('disabled', true)
    }

    enableInputs() {
        this.inputsList.forEach(input => input.enable())
        this.inpFile.removeAttribute('disabled')
        this.radioButtons.forEach(radio => radio.removeAttribute('disabled'))
        this.element.querySelector('button').removeAttribute('disabled')
    }
}