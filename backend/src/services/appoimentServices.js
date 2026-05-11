const { PrismaClient } = require("../../../generated/prisma")
const prisma = new PrismaClient()

exports.listAppoiments = async ( userId ) => {
    try {
        const appoiments = await prisma.appointment.findMany({
        where: {userId: parseInt(userId, 10)},
        include: {timeBlock: true}
        
    })

    return appoiments

    } catch (error) {
        throw new Error ("Error al obtener el historial de citasd")
    }
}