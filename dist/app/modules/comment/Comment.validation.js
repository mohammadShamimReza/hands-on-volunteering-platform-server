"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentValidation = exports.updateComment = exports.createComment = void 0;
const zod_1 = require("zod");
// ✅ Validation for Creating a Comment
exports.createComment = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'User ID is required' }),
        postId: zod_1.z.string({ required_error: 'Post ID is required' }),
        message: zod_1.z.string().optional(), // Message is optional
    }),
});
exports.updateComment = zod_1.z.object({
    body: zod_1.z.object({
        message: zod_1.z.string().optional(), // Allow updating only the message
    }),
});
exports.CommentValidation = {
    createComment: exports.createComment,
    updateComment: exports.updateComment,
};
