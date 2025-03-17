"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributionValidation = exports.updateContribution = exports.createContribution = void 0;
const zod_1 = require("zod");
// ✅ Validation for Creating a Contribution
exports.createContribution = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'User ID is required' }),
        postId: zod_1.z.string({ required_error: 'Post ID is required' }),
        message: zod_1.z.string().optional(), // Message is optional
    }),
});
exports.updateContribution = zod_1.z.object({
    body: zod_1.z.object({
        message: zod_1.z.string().optional(), // Allow updating only the message
    }),
});
exports.ContributionValidation = {
    createContribution: exports.createContribution,
    updateContribution: exports.updateContribution,
};
