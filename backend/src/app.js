// app.js es el archivo donde se configura la aplicación Express: middlewares, rutas y endpoints.

const express = require("express")
const cors = require("cors");
const routes = require("./routes")
const loggerMiddleware = require("./middlewares/logger")
const errorMiddleware = require("./middlewares/errorHandler")
const app = express()

app.use(cors({
  origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json())
app.use(loggerMiddleware)
app.use("/api", routes) // las rutas serian /api/...

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use(errorMiddleware)

module.exports = app
