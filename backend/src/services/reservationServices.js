const { PrismaClient } = require("../../../generated/prisma")
const prisma = new PrismaClient();

exports.createReservation = async ( data ) => {
    const conflict = await prisma.appointment.findFirst({ // busca en la tabla appointment un elemento que coincida con esa fecha o que tenga el mismo id
       where: {
        date: data.date,
        timeBlockId: data.timeBlockId
        }
    })

    if(conflict) {
        throw new Error("El horario ya está ocupado")
    }

    return prisma.appointment.create({data}) // creamos la reserva en la tabla appoiment
}

exports.getReservation = async ( id ) => {
    const reservation = await prisma.appointment.findUnique({
        where: { id: parseInt(id, 10) }
    });

    if (!reservation) {
        throw new Error("Reserva no encontrada")
    }

    return reservation
}

exports.updateReservation = async (data, id ) => {
    const conflict = await prisma.timeBlock.findFirst({
        where: {
            date: data.date,
            timeBlockId: data.timeBlockId,
            id: { not: parseInt(id, 10)}
        }
    })

    if (conflict) {
        throw new Error("El horario solicitado ya está ocupado")
    }

    return prisma.appointment.update({
        where: {id: parseInt(id, 10),},
        data
    })

    
}

exports.deleteReservation = async ( id ) => {
    const deleteReservation = await prisma.appointment.delete({
        where: {id: parseInt(id, 10)}
    })

    if(!deleteReservation) {
        return res.status(400).json({error: "Reservation no encontrada"})
    }

    return deleteReservation
}