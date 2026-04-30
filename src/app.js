// app.js es el archivo donde se configura la aplicación Express: middlewares, rutas y endpoints.

const express = require("express")
const routes = require("./routes")
const loggerMiddleware = require("./middlewares/logger")
const errorMiddleware = require("./middlewares/errorHandler")
const app = express()

app.use(express.json())
app.use(loggerMiddleware)
app.use("/api", routes) // las rutas serian /api/...

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use(errorMiddleware)

module.exports = app
