export default {
    register: {
        userName: {
            regex: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9À-ÿ\u00f1\u00d1_.]+(?<![_.])$/i,
            errorMsg: 'El nombre usuario debe tener una longitud de 8 a 20 carácteres y sólo puede contener carácteres alfanuméricos, puntos y/o guiones'
        },
        password: {
            regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            errorMsg: 'La contraseña debe contener un mínimo de 8 carácteres, una letra y un número',
        }
    },
    create: {
        adName: {
            regex: /^[a-zA-Z0-9À-ÿ\u00f1\u00d1]{1,}(((\s){1}[a-zA-Z0-9À-ÿ\u00f1\u00d1]{1,}){1,})?$/i,
            errorMsg: 'El nombre del artículo solo puede estar compuesto por carácteres alfanuméricos'
        },
        adPrice: {
            regex: /^[0-9]{1,}([.]{1}[0-9]{1,})?$/,
            errorMsg: 'El precio debe ser un valor numérico'
        },
        adFile: {
            errorMsg: 'El archivo debe estar en uno de los siguientes formatos: .jpg, .jpeg, .png, .gif'
        }
    }

}