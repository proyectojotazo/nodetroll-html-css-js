import InputController from "../InputController.js";

export class InputControllerAdName extends InputController {
    constructor(element) {
        super(element)
    }

    isValid() {
        // Regex: Solo contiene carácteres alfanúmericos y 1 espacio entre palabras
        const regex = /^[a-zA-Z0-9À-ÿ\u00f1\u00d1]{1,}(((\s){1}[a-zA-Z0-9À-ÿ\u00f1\u00d1]{1,}){1,})?$/i
        let isValid = regex.test(this.getValue())
        return isValid
    }

    showError(empty = false) {
        super.showError()

        const errMsg = empty ? 'Campo Requerido' :
            'El nombre del artículo solo puede estar compuesto por carácteres alfanuméricos'

        this.addClass('border-danger')

        this.errorDiv.setErrorMessage(errMsg)
        this.errorDiv.addClass('text-danger')

    }
}

export class InputControllerAdPrice extends InputController {
    constructor(element) {
        super(element)
    }

    isValid() {
        // Regex: Solo contiene carácteres numeros y puede contener un punto seguido de minimo, 1 numero
        const regex = /^[0-9]{1,}([.]{1}[0-9]{1,})?$/
        let isValid = regex.test(this.getValue())
        return isValid
    }

    showError(empty = false) {
        super.showError()
        this.resetError()
        const errMsg = empty ? 'Campo requerido' :
            'El precio debe ser un valor numérico'

        this.addClass('border-danger')

        this.errorDiv.setErrorMessage(errMsg)
        this.errorDiv.addClass('text-danger')

    }
}

export class InputControllerAdFile extends InputController {
    constructor(element) {
        super(element)
    }

    isValid() {

        // Si está vacío devolvemos true, pues es un campo opcional

        if (this.getValue() !== '') {
            // En caso que se le introduzca un archivo comprobaremos la extensión que sea valida

            const validExt = ['jpg', 'jpeg', 'png', 'gif']
            const imgName = this.getValue()
            const splittedName = imgName.split('.')
            const extension = splittedName[splittedName.length - 1]

            return validExt.some(ext => ext === extension)
        }

        return true

    }

    showError() {
        super.showError()
        this.resetError()

        const errMsg = 'El archivo debe estar en uno de los siguientes formatos: .jpg, .jpeg, .png, .gif'

        this.addClass('border-danger')

        this.errorDiv.setErrorMessage(errMsg)
        this.errorDiv.addClass('text-danger')

    }
}