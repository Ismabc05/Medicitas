// app.js es el archivo donde se configura la aplicación Express: middlewares, rutas y endpoints.

const express = require("express")
const routes = require("./routes")
const app = express()

app.use(express.json())
app.use("/api", routes) // las rutas serian /api/...

app.get("/", (req, res) => {
    res.send("Hello world")
})

module.exports = app
