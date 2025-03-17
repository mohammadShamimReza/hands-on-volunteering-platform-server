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
exports.teamService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.team.findMany({
        include: {
            members: {
                include: {
                    user: true,
                },
            },
            post: true,
        },
    });
    return result;
});
const getAllJoinedTeamByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.teamMember.findMany({
        where: {
            userId: id,
        },
        include: {
            team: true,
        },
    });
    return result.map(teamJoined => teamJoined.team);
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.team.findUnique({
        where: {
            id,
        },
        include: {
            members: {
                include: {
                    user: true,
                },
            },
        },
    });
    return result;
});
const getByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.team.findMany({
        where: {
            createdById: id,
        },
    });
    return result;
});
const getEventsByTeamId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.event.findMany({
        where: {
            createdByTeamId: id,
        },
    });
    console.log(result);
    return result;
});
const createTeam = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.team.create({
        data: payload,
    });
    return result;
});
const registerTeam = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.teamMember.create({
        data: payload,
    });
    console.log(result, 'this is register team');
    return result;
});
const updateTeam = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.team.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteUsesr = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.team.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.teamService = {
    getAllFromDb,
    getById,
    getEventsByTeamId,
    getByUserId,
    getAllJoinedTeamByUser,
    createTeam,
    registerTeam,
    updateTeam,
    deleteUsesr,
};
