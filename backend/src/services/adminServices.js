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

const listReservationService = async () => {
    const reservations = await prisma.appointment.findMany({
        include: {
            user: true,
            timeBlock: true
        }
    });

    return reservations
}

module.exports = {createTimeBlockService, listReservationService}