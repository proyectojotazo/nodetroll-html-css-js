import PubSub from "../../services/PubSub.js";

const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

export default class SearchController {
    constructor(element) {
        this.element = element
        this.addSearchEvent()
    }

    addSearchEvent() {
        this.element.addEventListener('input', debounce(() => {
            const searchParams = {
                value: this.element.value,
                search: this.element.value !== ''
            }
            PubSub.publish(PubSub.events.SEARCH, searchParams)
        }, 1500))
    }
}