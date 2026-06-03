const { Router } = require("express")
const authenticateToken = require("../middlewares/auth")
const appoimentController = require("../controllers/appoimentController")

const router = Router()

router.get("/:id/appoiment", authenticateToken, appoimentController.getUserAppoiment)
router.get("/:id/user", authenticateToken, appoimentController.getUser)
router.put("/edit-user/:id", appoimentController.editUser)

module.exports = router