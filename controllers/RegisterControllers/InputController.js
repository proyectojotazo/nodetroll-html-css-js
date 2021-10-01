import InputController from "../InputController.js"

export class InputControllerUserName extends InputController {
    constructor(element) {
        super(element)
    }

    isValidUserName() {
        // Regex: Solo contiene carácteres alfanumericos, puntos y guiones. 
        // Puntos y guiones no al principio, no seguidos uno de otro y no al final. Longitud de 8 a 20 caracteres
        const regex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9À-ÿ\u00f1\u00d1_.]+(?<![_.])$/i
        let isValid = regex.test(this.getValue())
        return isValid

    }

    showError() {
        super.showError()

        const errMsg = 'El nombre usuario debe tener una longitud de 8 a 20 carácteres y \
        sólo puede contener carácteres alfanuméricos, puntos y/o guiones'

        this.addClass('border-danger')

        this.errorDiv.setErrorMessage(errMsg)
        this.errorDiv.addClass('text-danger')

    }

}

export class InputControllerPassword extends InputController {
    constructor(element) {
        super(element)
    }

    isValidPass() {

        // Regex: Mínimo de 8 caracteres, mínimo una letra y mínimo un numero
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

        let isValid = regex.test(this.getValue())

        return isValid
    }

    showError(msg = '') {
        super.showError()

        const errMsg = 'La contraseña debe contener un mínimo de 8 carácteres\
        , una letra y un número'

        this.addClass('border-danger')
        this.errorDiv.setErrorMessage(msg || errMsg)
        this.errorDiv.addClass('text-danger')
    }

    samePasswordTo(passToCompare) {
        return this.getValue() === passToCompare
    }
}