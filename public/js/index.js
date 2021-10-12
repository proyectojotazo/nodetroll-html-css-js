import IndexController from "../../controllers/IndexControllers/IndexController.js"
import NavBarController from "../../controllers/IndexControllers/NavBarController.js"
import LoaderController from "../../controllers/LoaderController.js"
import ModalController from "../../controllers/ModalController.js"

window.addEventListener('DOMContentLoaded', () => {
    const modalContainer = document.querySelector('.modal-container')

    new ModalController(modalContainer)

    const loader = document.querySelector('.loader')

    new LoaderController(loader)

    const navBar = document.querySelector('.navbar')

    new NavBarController(navBar)

    const adsList = document.querySelector('.ad-list')

    new IndexController(adsList)

})