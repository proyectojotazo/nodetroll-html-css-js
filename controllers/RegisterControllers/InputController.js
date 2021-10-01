import ErrorMessageController from "./ErrorMessageController.js"

class InputController {
    constructor(element) {
        this.element = element
            // Cada input tiene como siguiente un elemento <div> el cual contendrá el mensaje de error
        this.errorDiv = new ErrorMessageController(this.element.nextElementSibling)
        this.eventCheckEmptyInput()
    }

    eventCheckEmptyInput() {
        // Reseteamos estilos del input en caso de que lo vaciemos
        this.element.addEventListener('input', () => {
            if (this.getValue() === '') {
                // Si vaciamos el/los inputs se reinician estilos y error
                this.resetStyles()
                this.resetError()
            }
        })
    }

    getValue() {
        return this.element.value
    }

    resetValue() {
        this.element.value = ''
    }

    disable() {
        this.element.setAttribute('disabled', true)
    }

    enable() {
        this.element.removeAttribute('disabled')
    }

    showError() {
        this.resetStyles()
    }

    showSuccess() {
        // Si se valida con éxito el input, reseteamos el mensaje de error a vacío y 
        // restablecemos los estilos por defecto para añadir los de 'success'
        this.resetError()
        this.resetStyles()
            // Mostramos el input de color verde, borde y texto
        this.element.classList.add('border-success', 'text-success')
    }

    resetError() {
        this.errorDiv.setErrorMessage('')
        this.errorDiv.removeClass('text-danger')
    }

    resetStyles() {
        // Reseteamos por defecto los estilos del input
        this.element.classList.remove('border-success', 'border-danger', 'text-success')
    }

    addClass(newClass) {
        this.element.classList.add(newClass)
    }

}

export class InputControllerUserName extends InputController {
    // TODO: Si se hace un 'cortar' se queda el border-success
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