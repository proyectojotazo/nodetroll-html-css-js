import InputController from "../InputController.js";

export default class LoginInputController extends InputController {
    constructor(element) {
        super(element)
    }

    showError() {
        super.showError()

        const errMsg = 'Campo obligatorio'

        this.addClass('border-danger')

        this.errorDiv.setErrorMessage(errMsg)
        this.errorDiv.addClass('text-danger')
    }
}