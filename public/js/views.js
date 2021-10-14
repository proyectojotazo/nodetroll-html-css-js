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

export const adCardView = (ad) => {
    const sellBuy = ad.sellbuy === 'sell' ?
        'En venta' :
        'En compra'

    const img = ad.adphoto === '' ?
        'https://via.placeholder.com/280x187' :
        ad.adphoto

    return `<a id="link-detail" href="detail.html?id=${ad.id}">
    <img class="card-img-top" src="${img}" alt="${ad.adname}">
    <div class="card-body d-flex flex-column justify-content-evenly">
        <h5 class="card-title">${ad.adname}</h5>
        <p class="card-text">Precio: ${ad.adPrice}€</p>
        <p class="card-text">${sellBuy}</p>
    </div>
    </a>
    `
}

export const adCardViewDetail = (ad) => {
    const sellBuy = ad.sellbuy === 'sell' ?
        'En venta' :
        'En compra'

    const img = ad.adphoto === '' ?
        'https://via.placeholder.com/280x187' :
        ad.adphoto

    const deleteButton = ad.canBeDeleted ?
        `<button class="delete btn btn-outline-dark">Borrar</button>` :
        ''

    return `<img class="card-img-top" src="${img}" alt="${ad.adname}">
    <div class="card-body d-flex flex-column justify-content-evenly">
        <h5 class="card-title">${ad.adname}</h5>
        <p class="card-text">Precio: ${ad.adPrice}€</p>
        <p class="card-text">${sellBuy}</p>
        ${deleteButton}
        <button class="btn btn-danger my-2 position-absolute back-btn" id="btn-back">Volver</button>
    </div>
    `
}

export const adCardViewDetailNotFound = () => {
    return `<h3 class="text-center mt-2">Anuncio No Encontrado</h3>
    <button class="btn btn-danger my-2 w-50 mx-auto" id="btn-back">Volver</button>
    `
}

export const navBarView = (isAuth) => {

    const showLogOut = isAuth ?
        `<button class="btn btn-danger" id="log-out">Cerrar Sesión</button>` :
        `<a href="/login.html" class="navbar-brand">Inicia Sesión</a>
        <a href="/register.html" class="navbar-brand">Regístrate</a>`


    return `<a href="/" class="navbar-brand">Wallatroll</a>
    <a href="/createad.html" class="navbar-brand">Crea Anuncio</a>
    ${showLogOut}
    <form class="form-inline mx-2">
        <input class="form-control mr-sm-2" type="search" placeholder="Buscar..." aria-label="Search">
        <button class="btn btn-dark my-2 my-sm-0" type="submit">Buscar</button>
    </form>`
}