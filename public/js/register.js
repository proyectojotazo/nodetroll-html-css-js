import LoaderController from '../../controllers/LoaderController.js'
import ModalController from '../../controllers/ModalController.js'
import FormController from '../../controllers/RegisterControllers/FormController.js'

window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form')

    new FormController(form)

    const modalContainer = document.querySelector('.modal-container')

    new ModalController(modalContainer)

    const loader = document.querySelector('.loader')

    new LoaderController(loader)
})