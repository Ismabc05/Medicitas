const { PrismaClient } = require("../../../generated/prisma")
const prisma = new PrismaClient();

const createTimeBlockService = async (startTime, endTime) => {
    const newBlockTime = await prisma.timeBlock.create({
        data: {
            startTime: new Date(startTime),
            endTime: new Date(endTime)
        }
    });

    return newBlockTime
}

const listTimeBlocksService = async () => {
    const timeblocks = await prisma.timeBlock.findMany({
        orderBy: {
            date: "asc"
        }
    })
    return timeblocks
}

const updateTimeBlockService = async (id, data) => {
  return await prisma.timeBlock.update({
    where: {
      id: parseInt(id),
    },
    data,
  });
};

const deleteTimeBlocksServices = async (id) => {
    const deleted = await prisma.timeBlock.delete({
            where: {id: parseInt(id)}
    })

    return deleted
}

const listReservationService = async () => {
    const reservations = await prisma.appointment.findMany({
        include: {
            user: true,
            timeBlock: true
        }
    });

    return reservations
}

module.exports = {createTimeBlockService, listReservationService, listTimeBlocksService, updateTimeBlockService, deleteTimeBlocksServices}