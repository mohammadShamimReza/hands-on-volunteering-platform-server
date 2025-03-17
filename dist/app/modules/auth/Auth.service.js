"use strict";
/* eslint-disable no-unused-vars */
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
exports.AuthService = void 0;
const index_js_1 = __importDefault(require("../../../config/index.js"));
const ApiError_js_1 = __importDefault(require("../../../errors/ApiError.js"));
const jwtHelpers_js_1 = require("../../../helpers/jwtHelpers.js");
const prisma_js_1 = __importDefault(require("../../../shared/prisma.js"));
const sendResetMail_js_1 = require("./sendResetMail.js");
const bcrypt = require('bcrypt');
const signUp = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // hash password before saving
    const { password: newPassword } = data;
    const newHashedPassword = yield bcrypt.hash(newPassword, Number(index_js_1.default.bycrypt_salt_rounds));
    data.password = newHashedPassword;
    const res = yield prisma_js_1.default.user.create({ data });
    console.log(res, 'this is res');
    const { email, role, id } = res;
    const accessToken = jwtHelpers_js_1.jwtHelpers.createToken({ email, role, id }, index_js_1.default.jwt.secret, index_js_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_js_1.jwtHelpers.createToken({ email, role, id }, index_js_1.default.jwt.refresh_secret, index_js_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const logIn = (LoginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = LoginData;
    let isUserExist;
    isUserExist = yield prisma_js_1.default.user.findFirst({
        where: {
            email,
        },
    });
    if (!isUserExist) {
        throw new ApiError_js_1.default(500, 'user not found');
    }
    const match = yield bcrypt.compare(password, isUserExist.password);
    console.log(match, 'this is match');
    if (!match) {
        throw new ApiError_js_1.default(500, 'Password is incorrect');
    }
    const { role, id } = isUserExist;
    const accessToken = jwtHelpers_js_1.jwtHelpers.createToken({ email, role, id }, index_js_1.default.jwt.secret, index_js_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_js_1.jwtHelpers.createToken({ email, password, id }, index_js_1.default.jwt.refresh_secret, index_js_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(user === null || user === void 0 ? void 0 : user.userId)) {
        throw new ApiError_js_1.default(500, 'User is not authenticated');
    }
    const { oldPassword, newPassword } = payload;
    // ✅ 1. Check if the user exists (Selecting password field explicitly)
    const existingUser = yield prisma_js_1.default.user.findUnique({
        where: { id: user.userId },
        select: {
            id: true,
            password: true, // Prisma does not return password by default
        },
    });
    if (!existingUser || !existingUser.password) {
        throw new ApiError_js_1.default(400, 'User does not exist');
    }
    // ✅ 2. Check if the old password matches
    const isPasswordMatched = yield bcrypt.compare(oldPassword, existingUser.password);
    if (!isPasswordMatched) {
        throw new ApiError_js_1.default(500, 'Old password is incorrect');
    }
    // ✅ 3. Hash new password
    const newHashedPassword = yield bcrypt.hash(newPassword, Number(index_js_1.default.bycrypt_salt_rounds)); // Adjust salt rounds
    // ✅ 4. Update the user's password in the database
    yield prisma_js_1.default.user.update({
        where: { id: user.userId },
        data: {
            password: newHashedPassword,
        },
    });
    return {
        message: 'Password changed',
    };
});
const forgotPass = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email }) {
    let isUserExist;
    isUserExist = yield prisma_js_1.default.user.findFirst({
        where: {
            email,
        },
    });
    if (!isUserExist) {
        throw new ApiError_js_1.default(500, 'User does not exist!');
    }
    const passResetToken = yield jwtHelpers_js_1.jwtHelpers.createResetToken({ id: isUserExist.id, role: isUserExist.role }, index_js_1.default.jwt.secret, '50m');
    const resetLink = index_js_1.default.resetlink + `?token=${passResetToken}`;
    console.log(isUserExist.email, 'this is user mail');
    const mailAnswer = yield (0, sendResetMail_js_1.sendEmail)(isUserExist.email, `
      <div>
        <p>Hi, ${isUserExist.fullName}</p>
        <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
        <p>Thank you</p>
      </div>
  `);
    console.log(mailAnswer, 'this is mailAnswer');
    return {
        message: mailAnswer,
    };
});
const me = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role, id } = userData;
    let isUserExistWithPassword;
    isUserExistWithPassword = yield prisma_js_1.default.user.findFirst({
        where: {
            email,
            role,
            id,
        },
        include: {
            eventsCreated: true,
            eventsJoined: true,
            teams: true,
            contributions: true,
            post: true,
            comments: true,
            teamsCreated: true,
            leaderboard: true,
            certificates: true,
        },
    });
    if (!isUserExistWithPassword) {
        throw new ApiError_js_1.default(500, 'You are not authorized to access this resource!');
    }
    return isUserExistWithPassword;
});
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, newPassword, token, role } = payload;
    let user;
    user = yield prisma_js_1.default.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) {
        throw new ApiError_js_1.default(500, 'User not found!');
    }
    let verifiedToken;
    try {
        verifiedToken = yield jwtHelpers_js_1.jwtHelpers.verifyToken(token, index_js_1.default.jwt.secret);
    }
    catch (error) {
        throw new ApiError_js_1.default(500, 'Token is invalid or expired!');
    }
    if (id !== verifiedToken.id || role !== verifiedToken.role) {
        throw new ApiError_js_1.default(500, 'Token is invalid or expired!');
    }
    const hashedPassword = yield bcrypt.hash(newPassword, Number(index_js_1.default.bycrypt_salt_rounds));
    const updatedUser = yield prisma_js_1.default.user.update({
        where: { id },
        data: { password: hashedPassword },
    });
    return updatedUser;
});
exports.AuthService = {
    me,
    signUp,
    logIn,
    changePassword,
    forgotPass,
    resetPassword,
};
