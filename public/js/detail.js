import DetailController from "../../controllers/DetailControllers/DetailController.js"
import ModalController from '../../controllers/ModalController.js'
import LoaderController from '../../controllers/LoaderController.js'


window.addEventListener('DOMContentLoaded', () => {
    const modalContainer = document.querySelector('.modal-container')

    new ModalController(modalContainer)

    const loader = document.querySelector('.loader')

    new LoaderController(loader)

    const detailCardContainer = document.querySelector('.ad-detail')

    const adId = new URLSearchParams(window.location.search).get('id')

    new DetailController(detailCardContainer, adId)
})