import ErrorMessageController from "./ErrorMessageController.js"

export default class InputController {
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