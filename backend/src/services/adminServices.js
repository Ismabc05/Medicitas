const { PrismaClient } = require("../../../generated/prisma")
const prisma = new PrismaClient(); // prisma client sirve para interactuar con la base de datos

const createTimeBlockService = async (startTime, endTime) => {
    const newBlockTime = await prisma.timeBlock.create({ // vamos a crear en la tabla timeBlock la siguiente data
        data: {
            startTime: new Date(startTime),
            endTime: new Date(endTime)
        }
    });

    return newBlockTime
}

const listTimeBlocksService = async () => {
    const timeblocks = await prisma.timeBlock.findMany({ // mostramos todas las columnas de la tabla timeBlock
        orderBy: { //ademas con orderBy mostramos eb orden ascendente la fecha de inicio
            startTime: "asc"
        },
        include: {
            appointments: true
        }
    })
    return timeblocks
}

const updateTimeBlockService = async (id, data) => {
  return await prisma.timeBlock.update({ // actualizamos una columna de la tabla timeBlock
    where: { // donde
      id: parseInt(id), // tenga ese id, se parsea a entero porque puede venir en sting
    },
    data, // y lo actualizamos con la data que le pasamos
  });
};

const deleteTimeBlocksServices = async (id) => {
    const deleted = await prisma.timeBlock.delete({ // eliminas una columna de la tabla timeBlocks
            where: {id: parseInt(id)} // donde ese id coincida
    })

    return deleted
}

const listReservationService = async () => {
    const reservations = await prisma.appointment.findMany({
        include: { // ademas va a incluir el usuario y el timeblock
            user: true,
            timeBlock: true
        }
    });

    return reservations
}

module.exports = {createTimeBlockService, listReservationService, listTimeBlocksService, updateTimeBlockService, deleteTimeBlocksServices}