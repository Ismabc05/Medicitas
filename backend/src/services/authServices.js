// En la carpeta services se encuentra la lógica de negocio de la aplicación, que es utilizada por los controladores para procesar los datos y construir la respuesta al cliente
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { PrismaClient } = require("../../../generated/prisma")
const prisma = new PrismaClient();

const registerUser = async (email, password, name) => {
    const hashedPassword = await bcrypt.hash(password, 10) // encriptamos la contraseña guardandola en hashedPassword
    const newUser = await prisma.user.create({ // creamos una columna en la tabla usuario
        data: { // con esa data
            email,
            password: hashedPassword,
            name,
            role: "USER"
        }
    });

    return newUser;
}


const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({ // encontramos la unica columna que coincida con el email
        where: { email }
    })

    if (!user) {
        throw new Error("Usuario o contraseña incorrectos")
    }
      
    const validPassword = await bcrypt.compare(password, user.password); // comparamos que la contraseña sea la misma
      
    if (!validPassword) {
       throw new Error("Usuario o contraseña incorrectos")
    }

    const token = jwt.sign( // creamos el token, que va a contener el user.id, user.role, la clave y que expirará en 4 horas
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '4h' }
    );

    return { token, user } // retornamos  el token y user para poder usarlo en la diferentes rutas para acceder a ellas

}

module.exports = {registerUser, loginUser}