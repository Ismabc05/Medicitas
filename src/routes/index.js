// index.js en routes actúa como un punto central que agrupa y organiza todos los routers de la aplicación


const { Router } = require("express")
const authRouter = require("./auth")
const adminRouter = require("./admin")
const reservationRouter = require("./reservation")

const router = Router();

router.use("/auth", authRouter) // dentro de /auth tenemos las rutas que pertenecen a ese grupo
router.use("/admin", adminRouter)
router.use("/reservations", reservationRouter)

module.exports = router