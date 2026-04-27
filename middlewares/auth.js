// este middleware se va a encarga de la autenticacion
const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1]; // con esto accedemos al encabezado de la solicitud a la posicion 1 donde estará el token de autenticacion

    if(!token) return res.status(401).json({error: "Access Denied, no token provided"})

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // verifica el token con nuestra clave
        if(err) {
            return res.status(403).json({error: "Invalid Token"})
        }

        req.user = user

        next();
    })
}

module.exports = authenticateToken