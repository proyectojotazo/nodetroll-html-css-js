export default class ErrorMessageController {
    constructor(element) {
        this.element = element
    }

    getValue() {
        return this.element.value
    }

    setErrorMessage(msg) {
        this.element.innerText = msg
    }

    addClass(newClass) {
        this.element.classList.add(newClass)
    }

    removeClass(classToRemove) {
        this.element.classList.remove(classToRemove)
    }
}