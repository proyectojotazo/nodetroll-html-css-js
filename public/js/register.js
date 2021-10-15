import LoaderController from '../../controllers/LoaderController.js'
import ModalController from '../../controllers/ModalController.js'
import RegisterController from '../../controllers/RegisterController.js'

window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form')

    new RegisterController(form)

    const modalContainer = document.querySelector('.modal-container')

    new ModalController(modalContainer)

    const loader = document.querySelector('.loader')

    new LoaderController(loader)
})