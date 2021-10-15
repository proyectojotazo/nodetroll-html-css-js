import LoaderController from "../../controllers/LoaderController.js"
import LoginController from "../../controllers/LoginController.js"
import ModalController from "../../controllers/ModalController.js"


window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form')

    new LoginController(form)

    const modalContainer = document.querySelector('.modal-container')

    new ModalController(modalContainer)

    const loader = document.querySelector('.loader')

    new LoaderController(loader)
})