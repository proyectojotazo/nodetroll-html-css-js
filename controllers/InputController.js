import ErrorMessageController from "./ErrorMessageController.js"

export default class InputController {
    constructor(element, config = {}) {
        this.element = element
        this.config = config
            // Cada input tiene como siguiente un elemento <div> el cual contendrá el mensaje de error
        this.errorDiv = new ErrorMessageController(this.element.nextElementSibling)
        this.eventCheckEmptyInput()
    }

    eventCheckEmptyInput() {
        // Reseteamos estilos del input en caso de que lo vaciemos
        this.element.addEventListener('input', () => {
            if (this.isEmpty()) {
                // Si vaciamos el/los inputs se reinician estilos y error
                this.resetStyles()
                this.resetError()
            }
        })
    }

    getValue() {
        return this.element.value
    }

    isEmpty() {
        return this.getValue() === ''
    }

    isValid() {
        const isValid = this.config.regex.test(this.getValue())

        if (isValid) this.showSuccess()
        else this.showError(this.config.errorMsg)

        return isValid
    }

    isValidFile() {
        // Función única para el input de tipo File
        // Si está vacío devolvemos true, pues es un campo opcional
        let isValid = true

        if (!this.isEmpty()) {
            const validExt = ['jpg', 'jpeg', 'png', 'gif']
            const imgName = this.getValue()
            const splittedName = imgName.split('.')
            const extension = splittedName[splittedName.length - 1]

            isValid = validExt.some(ext => ext === extension)

            if (isValid) this.showSuccess()
            else this.showError(this.config.errorMsg)
        }

        return isValid
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

    showError(errMsg) {
        this.resetStyles()

        this.addClass('border-danger')
        this.errorDiv.setErrorMessage(errMsg || '')
        this.errorDiv.addClass('text-danger')
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