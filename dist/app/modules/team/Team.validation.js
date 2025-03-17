"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamValidation = exports.updateTeam = exports.createTeam = exports.TeamTypeEnum = void 0;
const zod_1 = require("zod");
// ✅ Enum Validation for Team Type
exports.TeamTypeEnum = zod_1.z.enum(['PUBLIC', 'PRIVATE']);
exports.createTeam = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Team name is required' }),
        description: zod_1.z.string().optional(),
        type: exports.TeamTypeEnum.default('PUBLIC'), // Default is PUBLIC
        createdById: zod_1.z.string({
            required_error: 'CreatedById (User ID) is required',
        }),
    }),
});
exports.updateTeam = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        type: exports.TeamTypeEnum.optional(),
    }),
});
const registerTeam = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'UserId is required' }),
        teamId: zod_1.z.string({ required_error: 'TeamId is required' }),
    }),
});
exports.TeamValidation = {
    createTeam: exports.createTeam,
    updateTeam: exports.updateTeam,
    registerTeam,
};
