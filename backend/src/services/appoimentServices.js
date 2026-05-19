const { PrismaClient } = require("../../../generated/prisma")
const prisma = new PrismaClient()

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