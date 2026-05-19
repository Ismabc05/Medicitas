// este middleware se va a encarga de la autenticacion
const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1]; // accedemos al encabezado de la peticion concretamente a Authorization a la poisicion 1 que corresponde con el token

    if(!token) return res.status(401).json({error: "Access Denied, no token provided"})

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // verifica el token con nuestra clave
        if(err) {
            return res.status(403).json({error: "Invalid Token"})
        }

        req.user = user // guarda los  datos del usuario en la peticion asin puede saber las rutas quer usuario está haciendo la peticion y con sus permisos acceder a diferentes cosas

        next(); // pasa al siguiente middleware o la siguiente accion
    })
}

module.exports = authenticateToken