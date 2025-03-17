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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contributionService = void 0;
const client_1 = require("@prisma/client");
const date_fns_1 = require("date-fns");
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma = new client_1.PrismaClient();
const getLogHours = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, eventId, }) {
    const result = yield prisma.userEvent.findUnique({
        where: {
            userId_eventId: {
                userId,
                eventId,
            },
        },
        select: {
            joinedAt: true,
            user: {
                select: {
                    id: true,
                    fullName: true,
                    profileImage: true,
                },
            },
            event: {
                select: {
                    endDateTime: true,
                },
            },
        },
    });
    console.log(result);
    if (!result) {
        return new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User event not found');
    }
    const { joinedAt, event } = result;
    const now = new Date();
    // ✅ Determine the correct end time for calculation
    const calculationEndTime = (event === null || event === void 0 ? void 0 : event.endDateTime) && event.endDateTime < now ? event.endDateTime : now;
    // ✅ Calculate hours volunteered
    const hoursVolunteered = (0, date_fns_1.differenceInHours)(calculationEndTime, new Date(joinedAt));
    console.log(result);
    return {
        joinedAt,
        endDateTime: event === null || event === void 0 ? void 0 : event.endDateTime,
        hoursVolunteered,
        user: result,
    };
});
const getUserStats = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId }) {
    const userEvents = yield prisma.userEvent.findMany({
        where: { userId },
        include: {
            event: {
                select: {
                    endDateTime: true,
                },
            },
        },
    });
    if (!userEvents.length) {
        return {
            totalHours: 0,
            totalPoints: 0,
            message: 'No events found for this user',
        };
    }
    let totalHours = 0;
    userEvents.forEach(({ joinedAt, event }) => {
        const now = new Date();
        // ✅ Determine correct end time for calculation
        const calculationEndTime = (event === null || event === void 0 ? void 0 : event.endDateTime) && event.endDateTime < now ? event.endDateTime : now;
        // ✅ Calculate hours volunteered
        const hoursVolunteered = (0, date_fns_1.differenceInHours)(calculationEndTime, new Date(joinedAt));
        totalHours += hoursVolunteered;
    });
    const totalPoints = totalHours * 5; // ✅ 5 points per hour
    return { userId, totalHours, totalPoints };
});
const getLearderboard = () => __awaiter(void 0, void 0, void 0, function* () {
    const userEvents = yield prisma.userEvent.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    profileImage: true,
                },
            },
            event: {
                select: {
                    endDateTime: true,
                },
            },
        },
    });
    if (!userEvents.length) {
        return [];
    }
    // ✅ Calculate total hours and points per user
    const leaderboardMap = new Map();
    userEvents.forEach(({ user, joinedAt, event }) => {
        const now = new Date();
        // ✅ Determine the end time for calculation
        const calculationEndTime = (event === null || event === void 0 ? void 0 : event.endDateTime) && event.endDateTime < now ? event.endDateTime : now;
        // ✅ Calculate hours volunteered
        const hoursVolunteered = (0, date_fns_1.differenceInHours)(calculationEndTime, new Date(joinedAt));
        const pointsEarned = hoursVolunteered * 5; // ✅ 5 points per hour
        if (!leaderboardMap.has(user.id)) {
            leaderboardMap.set(user.id, {
                user,
                totalHours: 0,
                totalPoints: 0,
            });
        }
        const userStats = leaderboardMap.get(user.id);
        userStats.totalHours += hoursVolunteered;
        userStats.totalPoints += pointsEarned;
    });
    // ✅ Convert Map to Array and sort by total points (descending)
    const leaderboard = Array.from(leaderboardMap.values()).sort((a, b) => b.totalPoints - a.totalPoints);
    console.log(leaderboard, 'this is leaderboard');
    return leaderboard;
});
const createContribution = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.contribution.create({
        data: payload,
    });
    return result;
});
// const registerContribution = async (payload: UserContribution): Promise<UserContribution> => {
//   const result = await prisma.userContribution.create({
//     data: payload,
//   });
//   console.log(result, 'this is register contribution');
//   return result;
// };
const updateContribution = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.contribution.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteUsesr = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.contribution.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.contributionService = {
    getLogHours,
    getLearderboard,
    createContribution,
    getUserStats,
    // registerContribution,
    updateContribution,
    deleteUsesr,
};
