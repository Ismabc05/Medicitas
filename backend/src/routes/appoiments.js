const { Router } = require("express")
const authenticateToken = require("../middlewares/auth")
const appoimentController = require("../controllers/appoimentController")

const router = Router()

router.get("/:id/appoiment", authenticateToken, appoimentController.getUserAppoiment)

module.exports = router