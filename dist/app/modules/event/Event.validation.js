"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventValidation = exports.VisibilityEnum = exports.CausesEnum = void 0;
const zod_1 = require("zod");
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
// ✅ Define ENUM for Visibility
exports.VisibilityEnum = zod_1.z.enum(['PUBLIC', 'PRIVATE']);
// ✅ Create Event Validation
const createEvent = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Event title is required' }),
        description: zod_1.z.string({ required_error: 'Event description is required' }),
        date: zod_1.z.string({ required_error: 'Event date is required' }),
        time: zod_1.z.string({ required_error: 'Event time is required' }),
        location: zod_1.z.string({ required_error: 'Event location is required' }),
        category: exports.CausesEnum,
        endDateTime: zod_1.z.string({ required_error: 'Event date is required' }),
        requiredMembers: zod_1.z.number({
            required_error: 'Required members is required',
        }),
        visibility: exports.VisibilityEnum.default('PUBLIC'), // Default to PUBLIC
        createdById: zod_1.z
            .string({ required_error: 'CreatedById is required' })
            .optional(),
        createdByTeamId: zod_1.z
            .string({ required_error: 'CreatedByTeamId is required' })
            .optional(),
    }),
});
// ✅ Update Event Validation
const updateEvent = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        date: zod_1.z.string().optional(),
        time: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        category: zod_1.z.array(exports.CausesEnum).optional(),
        requiredMembers: zod_1.z.number().optional(),
        endDateTime: zod_1.z.string().optional(),
        visibility: exports.VisibilityEnum.optional(),
    }),
});
// ✅ Register for Event Validation
const registerEvent = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'UserId is required' }),
        eventId: zod_1.z.string({ required_error: 'EventId is required' }),
    }),
});
// ✅ Export Validations
exports.EventValidation = {
    createEvent,
    updateEvent,
    registerEvent,
};
