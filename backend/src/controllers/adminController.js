// los controllers son funcion que devuelven la respuesta del servidor, qaue llaman a serivces para que le proporcionen esa respuesta

const { createTimeBlockService, listReservationService, listTimeBlocksService, updateTimeBlockService, deleteTimeBlocksServices } = require("../services/adminServices")

const createTimeBlocks = async (req, res) => {
    if(req.user.role !== "ADMIN") { // validamos si el rol del usuario es admin
        return res.status(403).json({error: "Access denied"})
    }

    const {startTime, endTime} = req.body // del cuerpo de la peticion cojemos los valores

    try {
        const newTimeBlock = await createTimeBlockService(startTime, endTime) // llamamos al servicio que se encarga de crear el bloque
        return res.status(201).json(newTimeBlock) // y retornamos el bloque

    } catch (error) { // y si sale error emviamos el error correspondiente
        return res.status(500).json({error: "Error creating time block" })
    }
}

const getTimeBlocks = async (req, res) => {
    try{
        const timeblocks = await listTimeBlocksService()
        return res.json(timeblocks)
    } catch (error) {
         return res.status(500).json({error: "Error Fetching Reservations"})
    }
}

const updateTimeBlocks = async (req, res) => {
    if(req.user.role !== "ADMIN") {
        return res.status(403).json({error: "Access denied"})
    }

    try{
        const { id } = req.params;
        const { date, startTime, endTime } = req.body;

        const updated = await updateTimeBlockService(id, {date, startTime, endTime})
        return res.json(updated)

    } catch (error) {
        return res.status(500).json({ error: "Error updating time block" });
    }


}

const deleteTimeBlocks = async (req, res) => {
    if(req.user.role !== "ADMIN") {
        return res.status(403).json({error: "Access denied"})
    }

    try {
        const { id } = req.params;
        const deleted = await deleteTimeBlocksServices(id);
        return res.status(204).send()

    } catch (error) {
        return res.status(500).json({ error: "Error delete time block" });
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

module.exports = {createTimeBlocks, listReservations, getTimeBlocks, updateTimeBlocks, deleteTimeBlocks}