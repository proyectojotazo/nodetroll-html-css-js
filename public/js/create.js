import CreateController from "../../controllers/CreateController.js"
import LoaderController from "../../controllers/LoaderController.js"
import ModalController from "../../controllers/ModalController.js"
import RequestServices from "../../services/RequestServices.js"

window.addEventListener('DOMContentLoaded', () => {

    if (!RequestServices.isAuthenticated()) {
        window.location.href = '/login.html?next=/createad.html'
    }

    const formCreate = document.querySelector('form')

    new CreateController(formCreate)

    const modalContainer = document.querySelector('.modal-container')

    new ModalController(modalContainer)

    const loader = document.querySelector('.loader')

    new LoaderController(loader)
})