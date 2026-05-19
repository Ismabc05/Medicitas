// app.js es el archivo donde se configura la aplicación Express: middlewares, rutas y endpoints.

const express = require("express")
const cors = require("cors"); // cors sirve para poder traer datos de una api externa, ya que el navegador la detecta como sospechosa
const routes = require("./routes")
const loggerMiddleware = require("./middlewares/logger")
const errorMiddleware = require("./middlewares/errorHandler")
const app = express()

app.use(cors()); // y así es como se usa
app.use(express.json())
app.use(loggerMiddleware)
app.use("/api", routes) // las rutas serian /api/...

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use(errorMiddleware)

module.exports = app
