import CreateController from "../../controllers/CreateControllers/CreateController.js"
import LoaderController from "../../controllers/LoaderController.js"
import ModalController from "../../controllers/ModalController.js"
import DataServices from "../../services/DataServices.js"

window.addEventListener('DOMContentLoaded', () => {

    if (!DataServices.isAuthenticated()) {
        window.location.href = '/login.html?next=/createad.html'
    }

    const formCreate = document.querySelector('form')

    new CreateController(formCreate)

    const modalContainer = document.querySelector('.modal-container')

    new ModalController(modalContainer)

    const loader = document.querySelector('.loader')

    new LoaderController(loader)
})