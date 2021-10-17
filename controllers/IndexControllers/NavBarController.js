import { navBarView } from "../../public/js/views.js"
import RequestServices from "../../services/RequestServices.js"
import SearchController from "./SearchController.js"

export default class NavBarController {
    constructor(element) {
        this.element = element
        this.showNav()
        new SearchController(this.element.querySelector('input[type="search"]'))
        this.attachEventLogOutUser()
    }

    showNav() {
        const isAuth = RequestServices.isAuthenticated()
        this.element.innerHTML = navBarView(isAuth)
    }

    attachEventLogOutUser() {
        const btnLogOut = document.querySelector('#log-out')
        if (btnLogOut) {
            btnLogOut.addEventListener('click', () => {
                localStorage.removeItem('token')
                    // Para refrescar el navegador
                window.location.href = '/'
            })

        }
    }
}