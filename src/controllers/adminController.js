const { createTimeBlockService, listReservationService} = require("../services/adminServices")

const createTimeBlocks = async (req, res) => {
    if(req.user.role !== "ADMIN") {
        return res.status(403).json({error: "Access denied"})
    }

    const {startTime, endTime} = req.body

    try {
        const newTimeBlock = await createTimeBlockService(startTime, endTime)
        return res.status(201).json(newTimeBlock)

    } catch (error) {
        return res.status(500).json({error: "Error creating time block" })
    }
}


const listReservations = async (req, res) => {
    if(req.user.role !== "ADMIN") {
        return res.status(403).json({error: "Access denied"})
    }

    try{
        const reservations = await listReservationService()
        return res.json(reservations)
    } catch (error) {
        return res.status(500).json({error: "Error Fetching Reservations"})
    }
}

module.exports = {createTimeBlocks, listReservations}