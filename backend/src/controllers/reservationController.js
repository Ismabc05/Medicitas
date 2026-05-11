const reservationServices = require("../services/reservationServices")


exports.createReservation = async (req, res) => {
    try{
        const reservations = await reservationServices.createReservation(req.body)
        return res.status(201).json(reservations)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

exports.getReservation = async (req, res) => {
    try{
        const reservation = await reservationServices.getReservation(req.params.id)
        if(!reservation) {
            return res.status(404).json({error: "Reservation not found"})
        }
        return res.status(201).json(reservation)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

exports.updateReservation = async (req, res) => {
    try{
        const updateReservation = await reservationServices.updateReservation(req.body, req.params.id)
        if(!updateReservation) {
            return res.status(404).json( updateReservation )
        }
        return res.status(201).json({message: "User update succesfully"})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

exports.deleteReservation = async (req, res) => {
    try{
        const deleteReservation = await reservationServices.deleteReservation(req.params.id)
        if(!deleteReservation) {
            return res.status(404).json({error: "Reservation not found"})
        }
        return res.status(204).send()
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}