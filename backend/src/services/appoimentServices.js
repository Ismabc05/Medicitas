const { PrismaClient } = require("../../../generated/prisma")
const prisma = new PrismaClient()
const bcrypt = require("bcryptjs");

exports.listAppoiments = async ( userId ) => {
    try {
        const appoiments = await prisma.appointment.findMany({ // buscamos en la tabla appoiment
        where: {userId: parseInt(userId, 10)}, // donde contenta ese id
        include: {timeBlock: true} // y ademnas va a incluir el timeblock
        
    })

    return appoiments

    } catch (error) {
        throw new Error ("Error al obtener el historial de citas")
    }
}

exports.getUserById = async (userId) => {

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId, 10)
            },

            include: {
                appointments: {
                    include: {
                        timeBlock: true
                    }
                }
            }
        })

        return user

    } catch (error) {
        throw new Error("Error al obtener el usuario")
    }
}

exports.editUser = async (id, data) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.email && { email: data.email }),
      ...(data.password && { password: data.password }),
    },
  });

  return updatedUser;
};