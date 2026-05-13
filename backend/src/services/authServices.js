// En la carpeta services se encuentra la lógica de negocio de la aplicación, que es utilizada por los controladores para procesar los datos y construir la respuesta al cliente
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { PrismaClient } = require("../../../generated/prisma")
const prisma = new PrismaClient();

const registerUser = async (email, password, name) => {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        name
      }
    });

    return user;
  } catch (error) {
    // 👇 ESTE ES EL ERROR DE EMAIL DUPLICADO
    if (error.code === "P2002") {
      throw new Error("El email ya está registrado");
    }

    throw new Error("Error al crear usuario");
  }
};


const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        throw new Error("Invalid email or password")
    }
      
    const validPassword = await bcrypt.compare(password, user.password);
      
    if (!validPassword) {
       throw new Error("Invalid email or password")
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '4h' }
    );

    return token

}

module.exports = {registerUser, loginUser}