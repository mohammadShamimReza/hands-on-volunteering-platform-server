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
exports.postService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.post.findMany({
        include: {
            comments: {
                include: {
                    user: true,
                },
            },
        },
    });
    return result;
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.post.findUnique({
        where: {
            id,
        },
        include: {
            comments: {
                include: {
                    user: true,
                },
            },
        },
    });
    return result;
});
const getPostByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.post.findMany({
        where: {
            createdById: id,
        },
    });
    return result;
});
const getPostByTeamId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.post.findMany({
        where: {
            createdByTeamId: id,
        },
    });
    return result;
});
const createPost = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.post.create({
        data: payload,
    });
    return result;
});
// const registerPost = async (payload: UserPost): Promise<UserPost> => {
//   const result = await prisma.userPost.create({
//     data: payload,
//   });
//   console.log(result, 'this is register post');
//   return result;
// };
const updatePost = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.post.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, 'this is id');
    const result = yield prisma.post.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.postService = {
    getAllFromDb,
    getById,
    createPost,
    getPostByUserId,
    // registerPost,
    getPostByTeamId,
    updatePost,
    deletePost,
};
