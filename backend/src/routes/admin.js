const { Router } = require("express")
const { createTimeBlocks, listReservations, getTimeBlocks, updateTimeBlocks, deleteTimeBlocks } = require("../controllers/adminController")
const authenticateToken = require("../middlewares/auth")

const router = Router()

router.get("/time-blocks", authenticateToken, getTimeBlocks);
router.post("/create-time-blocks", authenticateToken, createTimeBlocks);
router.put("/update-time-blocks/:id", authenticateToken, updateTimeBlocks);
router.delete("/delete-time-blocks/:id", authenticateToken, deleteTimeBlocks);
router.get("/reservations", authenticateToken, listReservations)

module.exports = router