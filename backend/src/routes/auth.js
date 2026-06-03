// auth.js define las rutas relacionadas con la autenticación (login, register, rutas protegidas) y conecta esas rutas con los controllers y middlewares correspondientes.

const { Router } = require("express")
const { register, login, edit} = require("../controllers/authController")
const authenticateToken = require("../middlewares/auth")

const router = Router()

router.post("/register", register);
router.post("/login", login)
router.put("/edit-user/:id", edit)

router.get("/protected-route", authenticateToken, (req, res) => {
    res.send("Esta es una ruta protegida")
})

module.exports = router