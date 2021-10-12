import { navBarView } from "../../public/js/views.js"
import DataServices from "../../services/DataServices.js"

export default class NavBarController {
    constructor(element) {
        this.element = element
        this.showNav()
        this.attachEventLogOutUser()
    }

    showNav() {
        const isAuth = DataServices.isAuthenticated()
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