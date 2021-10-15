import AdsServices from "../services/AdsServices.js"
import PubSub from "../services/PubSub.js"
import InputsConfig from "../services/InputsConfig.js"

import InputController from "./InputController.js"

const { adName, adFile, adPrice } = InputsConfig.create

export default class CreateController {
    constructor(element) {
        this.element = element

        this.inpAdName = new InputController(this.element.querySelector('input[name="adname"]'), adName)
        this.inpAdPrice = new InputController(this.element.querySelector('input[name="adPrice"]'), adPrice)
        this.inpFile = new InputController(document.querySelector('input[type="file"]'), adFile)

        this.radioButtons = document.querySelectorAll('input[type="radio"]')

        this.inputsList = [this.inpAdName, this.inpFile, this.inpAdPrice]

        this.attachEvents()
    }

    attachEvents() {
        this.element.addEventListener('submit', e => {
            e.preventDefault()
            this.createAd()
        })
        this.goIndexEventButton()
        this.toogleActiveButton()
    }

    async createAd() {
        if (this.validFields()) {
            const adData = this.getInputsData()
            PubSub.publish(PubSub.events.SHOW_LOADER)
            this.disableInputs()
            try {
                await AdsServices.createAd(adData)
                PubSub.publish(PubSub.events.SHOW_SUCCESS, 'El anuncio se ha creado con éxito')
            } catch (error) {
                PubSub.publish(PubSub.events.SHOW_ERROR, error)
            } finally {
                PubSub.publish(PubSub.events.HIDE_LOADER)
                this.resetInputs()
                this.enableInputs()
            }
        }
    }

    goIndexEventButton() {

        this.element.querySelector('#back').addEventListener('click', () => {
            window.location.href = '/'
        })
    }

    toogleActiveButton() {
        const inputList = [this.inpAdName, this.inpAdPrice]

        inputList.forEach(inp => {
            inp.element.addEventListener('input', () => {
                const activateButton = inputList.every(input => !input.isEmpty())
                if (activateButton) {
                    this.element.querySelector('button[type="submit"]').removeAttribute('disabled')
                } else {
                    this.element.querySelector('button[type="submit"]').setAttribute('disabled', true)
                }
            })
        })
    }

    validFields() {
        const validAdName = this.inpAdName.isValid()
        const validAdPrice = this.inpAdPrice.isValid()
        const validAdImage = this.inpFile.isValidFile()

        return (validAdName && validAdPrice && validAdImage)

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
    }
}