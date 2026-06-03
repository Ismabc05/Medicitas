//La carpeta controller se encarga de manejar la petición del cliente, llamar a las funciones de la capa service (donde está la lógica de negocio) y devolver la respuesta al cliente.

const { registerUser, loginUser} = require("../services/authServices")


const register = async (req, res) => {
    try {
        const { email, password, name} = req.body
        await registerUser(email, password, name)
        return res.status(201).json({message: "User registered Succesfully"})
    } catch (error) {
        return res.status(400).json({error: "El usuario ya existe"})
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const { token, user } = await loginUser(email, password);
        return res.json({ token, user })
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = {register, login}