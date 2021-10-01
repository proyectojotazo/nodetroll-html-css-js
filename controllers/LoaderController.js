import PubSub from "../services/PubSub.js"
import { loaderView } from "../public/js/views.js"

export default class LoaderController {

    constructor(element) {
        this.element = element
        this.element.innerHTML = loaderView()
        PubSub.subscribe(PubSub.events.SHOW_LOADER, () => {
            this.showLoader()
        })
        PubSub.subscribe(PubSub.events.HIDE_LOADER, () => {
            this.hideLoader()
        })
    }

    hideLoader() {
        this.element.firstChild.classList.add('hidden')
    }

    showLoader() {
        this.element.firstChild.classList.remove('hidden')
    }

}