// index.js en routes actúa como un punto central que agrupa y organiza todos los routers de la aplicación


const { Router } = require("express")
const authRouter = require("./auth")

const router = Router();

router.use("/auth", authRouter) // dentro de /auth tenemos las rutas que pertenecen a ese grupo

module.exports = router