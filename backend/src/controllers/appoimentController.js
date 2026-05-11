const appoimentServices = require("../services/appoimentServices")

exports.getUserAppoiment = async (req, res) => {
    try {

        const userId = req.params.id
        const appoiments = await appoimentServices.listAppoiments(userId)
        
        res.status(201).json(appoiments)

    } catch (error) {
        return res.status(400).json({error: "Error al obterner el historial de citas"})
    }
}