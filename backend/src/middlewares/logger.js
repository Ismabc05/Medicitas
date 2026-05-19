// este middleware te muestra informacion sobre la peticion y la respuesta


const LoggerMiddleware = (req, res, next) => {

    const fecha = new Date().toISOString()

    console.log(`${fecha} - Método: ${req.method} - Url: ${req.url} - Ip:  ${req.ip}`) // imprime por pantalla la fecha, el metodo, la url y la ip

    const start = Date.now() // contiene la fecha actual

    res.on("finish", () => { // cuando la respuesta escucha el event finish entonces
        const duracion = Date.now() - start // calculamos la duracion que seria restar la fecha actual con la anterior
        console.log(`${fecha} - Status: ${res.statusCode} - Duracion: ${duracion}ms`) // e imprimimos la fecha actual, con el codigo de estado, y la duracion
    })

    next() // y pasamos a la siguiente accion o siguiente middleware
}

module.exports = LoggerMiddleware