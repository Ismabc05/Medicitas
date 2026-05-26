const { PrismaClient } = require("../../../generated/prisma")
const prisma = new PrismaClient(); // prisma client sirve para interactuar con la base de datos

const createTimeBlockService = async (startTime, endTime) => {
  const newStart = new Date(startTime);
  const newEnd = new Date(endTime);

  if (isNaN(newStart) || isNaN(newEnd)) {
    throw new Error("Formato de fecha inválido");
  }

  if (newStart >= newEnd) {
    throw new Error("La hora de inicio debe ser menor que la de fin");
  }

  const conflict = await prisma.timeBlock.findFirst({
    where: {
      AND: [
        {
          startTime: {
            lt: newEnd,
          },
        },
        {
          endTime: {
            gt: newStart,
          },
        },
      ],
    },
  });

  if (conflict) {
    throw new Error("Ya existe un horario que se cruza con ese rango");
  }

  const newBlockTime = await prisma.timeBlock.create({
    data: {
      startTime: newStart,
      endTime: newEnd,
    },
  });

  return newBlockTime;
};

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
  const currentId = parseInt(id, 10);
  const newStart = new Date(data.startTime);
  const newEnd = new Date(data.endTime);

  if (isNaN(newStart.getTime()) || isNaN(newEnd.getTime())) {
    throw new Error("Formato de fecha inválido");
  }

  if (newStart >= newEnd) {
    throw new Error("La hora de inicio debe ser menor que la de fin");
  }

  const conflict = await prisma.timeBlock.findFirst({
    where: {
      AND: [
        {
          id: {
            not: currentId,
          },
        },
        {
          startTime: {
            lt: newEnd,
          },
        },
        {
          endTime: {
            gt: newStart,
          },
        },
      ],
    },
  });

  if (conflict) {
    throw new Error("Ya existe un horario que se cruza con ese rango");
  }

  return await prisma.timeBlock.update({
    where: {
      id: currentId,
    },
    data: {
      startTime: newStart,
      endTime: newEnd,
    },
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