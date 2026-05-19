// este middleware informa de errores

const errorHandler = (err, req, res, next) => {

    const fecha = new Date().toISOString() // fecha contendra la fecha actual
    const message = err.message || "Mensaje no encontrado" // mensaje
    const statusCode = err.statusCode || 500 // codigo de error

    console.error(`${fecha} - mensaje: ${message} - StatusCode: ${statusCode}`) // imprime por console todo

    if(err.stack){ // si existe el stack tambien los imprime
        console.error(`Stack de error: ${err.stack}`)
    }

    res.status(statusCode).json({ // la respuesta va a ser el status code, con el mensaje y si la variable de entorno es development tambien se muestra el stack
        CodigoEstado: statusCode,
        mensaje: message,
        ...(process.env.NODE_ENV === "development" && {stack : err.stack})
    })
}

// este middleware es muy util ya que permite ver que error fue y muestra toda su informacion
module.exports = errorHandler