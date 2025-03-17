"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllFromDb = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, location, available } = filters;
    const result = yield prisma.event.findMany({
        where: {
            AND: [
                available
                    ? {
                        endDateTime: {
                            gte: new Date(), // ✅ Only upcoming events if available is true
                        },
                    }
                    : {},
                category ? { category: category } : {},
                location
                    ? { location: { contains: location, mode: 'insensitive' } }
                    : {},
            ],
        },
        orderBy: {
            endDateTime: 'asc', // ✅ Sort events by soonest end date
        },
        include: {
            createdBy: true, // ✅ Include creator details
            participants: true, // ✅ Include participants
        },
    });
    return result;
});
const getAllRegisteredEventByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.userEvent.findMany({
        where: {
            userId: userId, // Find where user is a participant
        },
        include: {
            event: true, // Include event details
        },
    });
    return result.map(userEvent => userEvent.event); // Extract the event details
});
const getAllEventCreateByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.event.findMany({
        where: {
            createdById: userId, // Find where user is a participant
        },
        include: {
            participants: true,
        },
    });
    console.log(result);
    return result; // Extract the event details
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.event.findUnique({
        where: {
            id,
        },
        include: {
            participants: {
                include: {
                    user: true
                }
            }
        }
    });
    return result;
});
const createEvent = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.event.create({
        data: payload,
    });
    return result;
});
const registerEvent = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.userEvent.create({
        data: payload,
    });
    console.log(result, 'this is register event');
    return result;
});
const updateEvent = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.event.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteUsesr = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.event.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.eventService = {
    getAllFromDb,
    getAllRegisteredEventByUser,
    getAllEventCreateByUser,
    getById,
    createEvent,
    registerEvent,
    updateEvent,
    deleteUsesr,
};
