export const modalView = (data, success = false, error = false) => {
    const classes = success ? 'bg-success' : error ? 'bg-danger' : ''
    return `<div class="modal-window">
    <h5 class="modal-title ${classes}">${data.title}
        <button class="close-button ${classes}">X</button>
    </h5>
    <p class="modal-text">${data.message}</p></div>`
}

export const loaderView = () => {
    return '<div class="lds-ring hidden"><div></div><div></div><div></div><div></div></div>'
}