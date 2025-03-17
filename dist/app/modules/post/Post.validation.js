"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidation = exports.updatePost = exports.createPost = exports.HelpStatusEnum = exports.UrgencyEnum = void 0;
const zod_1 = require("zod");
// ✅ Enum Validation for Urgency & HelpStatus (Matches Prisma)
exports.UrgencyEnum = zod_1.z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']);
exports.HelpStatusEnum = zod_1.z.enum(['OPEN', 'CLOSED']); // Add any other statuses if needed
// ✅ Create Post Validation
exports.createPost = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
        description: zod_1.z.string().optional(),
        urgency: exports.UrgencyEnum.default('MEDIUM'), // ✅ Uses the enum validation
        status: exports.HelpStatusEnum.default('OPEN'), // ✅ Uses the enum validation
        createdById: zod_1.z.string().optional(), // ✅ Optional, as either user or org creates it
        createdByTeamId: zod_1.z.string().optional(), // ✅ Optional, as either user or org creates it
    }),
});
exports.updatePost = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        urgency: exports.UrgencyEnum.optional(),
        status: exports.HelpStatusEnum.optional(),
        createdById: zod_1.z.string().optional(),
        createdByTeamId: zod_1.z.string().optional(),
    }),
});
// ✅ Register for Post Validation
const registerPost = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'UserId is required' }),
        postId: zod_1.z.string({ required_error: 'PostId is required' }),
    }),
});
// ✅ Export Validations
exports.PostValidation = {
    createPost: exports.createPost,
    updatePost: exports.updatePost,
    registerPost,
};
