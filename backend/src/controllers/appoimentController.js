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

exports.getUser = async (req, res) => {

    try {

        const userId = req.params.id

        const user = await appoimentServices.getUserById(userId)

        if (!user) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            })
        }

        return res.status(200).json(user)

    } catch (error) {

        return res.status(400).json({
            error: "Error al obtener el usuario"
        })

    }
}

exports.editUser = async (req, res) => {

    try{

        const { id } = req.params;
        const { name, email, password } = req.body
        const updated = await appoimentServices.editUser(id, {name, email, password})
        return res.json(updated)

    }catch (error){
        return res.status(400).json({ error: error.message });
    }

}