import e from 'express';
import { z } from 'zod';

export const CausesEnum = z.enum([
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
export const VisibilityEnum = z.enum(['PUBLIC', 'PRIVATE']);

// ✅ Create Event Validation
const createEvent = z.object({
  body: z.object({
    title: z.string({ required_error: 'Event title is required' }),
    description: z.string({ required_error: 'Event description is required' }),
    date: z.string({ required_error: 'Event date is required' }),
    time: z.string({ required_error: 'Event time is required' }),
    location: z.string({ required_error: 'Event location is required' }),
    category: CausesEnum,
    endDateTime: z.string({ required_error: 'Event date is required' }),
    requiredMembers: z.number({
      required_error: 'Required members is required',
    }),
    visibility: VisibilityEnum.default('PUBLIC'), // Default to PUBLIC
    createdById: z
      .string({ required_error: 'CreatedById is required' })
      .optional(),
    createdByTeamId: z
      .string({ required_error: 'CreatedByTeamId is required' })
      .optional(),
  }),
});

// ✅ Update Event Validation
const updateEvent = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.string().optional(),
    time: z.string().optional(),
    location: z.string().optional(),
    category: z.array(CausesEnum).optional(),
    requiredMembers: z.number().optional(),
    endDateTime: z.string().optional(),
    visibility: VisibilityEnum.optional(),
  }),
});

// ✅ Register for Event Validation
const registerEvent = z.object({
  body: z.object({
    userId: z.string({ required_error: 'UserId is required' }),
    eventId: z.string({ required_error: 'EventId is required' }),
  }),
});

// ✅ Export Validations
export const EventValidation = {
  createEvent,
  updateEvent,
  registerEvent,
};
