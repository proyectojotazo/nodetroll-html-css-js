import DataServices from "../../services/DataServices.js"
import { InputControllerAdName, InputControllerAdPrice } from "./CreateInputController.js"

export default class CreateController {
    constructor(element) {
        this.element = element

        this.inpAdName = new InputControllerAdName(this.element.querySelector('input[name="adname"]'))
        this.inpAdPrice = new InputControllerAdPrice(this.element.querySelector('input[name="adPrice"]'))

        this.inpList = [this.inpAdName, this.inpAdPrice]

        this.attachEvents()
    }

    attachEvents() {
        this.element.addEventListener('submit', async e => {
            e.preventDefault()
            this.getRadioSelected()
            if (this.validFields()) {
                // Crea el anuncio
                const adData = this.getInputsData()
                console.log(adData)
                console.log('Se crea el anuncio')
            } else {
                console.error('No se ha podido crear el anuncio')
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
        const adPhoto = document.querySelector('input[name="adphoto"]').value
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
        const radioList = document.querySelectorAll('input[name="sellbuy"]')
        const radioChecked = [...radioList].filter(radio => radio.checked === true)[0]

        return radioChecked.value
    }

    resetInputStyles() {
        this.inpList.forEach(input => input.resetStyles())
    }
}