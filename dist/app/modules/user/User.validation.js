"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.CausesEnum = exports.SkillsEnum = void 0;
const zod_1 = require("zod");
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
const updateUser = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string().optional(),
        email: zod_1.z.string().email({ message: 'Invalid email format' }).optional(),
        bio: zod_1.z.string().optional(),
        profileImage: zod_1.z
            .string()
            .optional(),
        skills: zod_1.z.array(exports.SkillsEnum).optional(),
        causes: zod_1.z.array(exports.CausesEnum).optional(),
    }),
});
exports.UserValidation = {
    updateUser,
};
