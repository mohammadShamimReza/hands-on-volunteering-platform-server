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
exports.commentService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.comment.findMany({});
    return result;
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.comment.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const createComment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.comment.create({
        data: payload,
    });
    return result;
});
// const registerComment = async (payload: UserComment): Promise<UserComment> => {
//   const result = await prisma.userComment.create({
//     data: payload,
//   });
//   console.log(result, 'this is register comment');
//   return result;
// };
const updateComment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.comment.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteUsesr = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.comment.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.commentService = {
    getAllFromDb,
    getById,
    createComment,
    // registerComment,
    updateComment,
    deleteUsesr,
};
