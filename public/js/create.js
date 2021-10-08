import CreateController from "../../controllers/CreateControllers/CreateController.js"

window.addEventListener('DOMContentLoaded', () => {

    const formCreate = document.querySelector('form')

    new CreateController(formCreate)
})