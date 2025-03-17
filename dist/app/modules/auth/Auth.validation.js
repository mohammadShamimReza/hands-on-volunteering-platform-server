"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = exports.create = exports.CausesEnum = exports.SkillsEnum = void 0;
const zod_1 = require("zod");
// ✅ Define ENUMS for skills and causes
exports.SkillsEnum = zod_1.z.enum([
    'Academic',
    'Art',
    'Business',
    'Communication',
    'Computer',
    'Cooking',
    'Craft',
    'Creative',
    'Design',
    'Engineering',
    'Finance',
    'Health',
    'Language',
    'Leadership',
    'Legal',
    'Management',
    'Marketing',
    'Music',
    'Photography',
    'Programming',
    'Science',
    'Social',
]);
exports.CausesEnum = zod_1.z.enum([
    'Animal',
    'Arts',
    'Children',
    'Community',
    'Crisis',
    'Culture',
    'Disability',
    'Disaster',
    'Education',
    'Elderly',
    'Employment',
    'Environment',
    'Health',
    'Human',
    'Humanitarian',
    'International',
    'Poverty',
    'Rights',
    'Social',
    'Sports',
    'Technology',
]);
exports.create = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string({
            required_error: 'Full Name is required',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email('Invalid email format'),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
        })
            .min(8, 'Password must be at least 8 characters'),
        bio: zod_1.z.string().optional(),
        role: zod_1.z.enum(['USER', 'ADMIN', 'ORG'], {
            required_error: 'Role is required',
        }),
        profileImage: zod_1.z.string().url('Invalid URL format').optional(),
        skills: zod_1.z
            .array(exports.SkillsEnum, {
            required_error: 'At least one skill is required',
        })
            .min(1, 'At least one skill must be selected'),
        causes: zod_1.z
            .array(exports.CausesEnum, {
            required_error: 'At least one cause is required',
        })
            .min(1, 'At least one cause must be selected'),
    }),
});
const login = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
        role: zod_1.z.string({ required_error: 'role is required' }), // Role is optional in the model
    }),
});
const changePasswordZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: 'Old password  is required',
        }),
        newPassword: zod_1.z.string({
            required_error: 'New password  is required',
        }),
    }),
});
exports.AuthValidation = {
    create: exports.create,
    login,
    changePasswordZodSchema,
};
