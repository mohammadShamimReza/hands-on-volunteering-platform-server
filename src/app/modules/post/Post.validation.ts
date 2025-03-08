import { z } from 'zod';

// ✅ Enum Validation for Urgency & HelpStatus (Matches Prisma)
export const UrgencyEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']);
export const HelpStatusEnum = z.enum(['OPEN', 'CLOSED']); // Add any other statuses if needed

// ✅ Create Post Validation
export const createPost = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string().optional(),
    urgency: UrgencyEnum.default('MEDIUM'), // ✅ Uses the enum validation
    status: HelpStatusEnum.default('OPEN'), // ✅ Uses the enum validation
    createdById: z.string().optional(), // ✅ Optional, as either user or org creates it
    createdByOrganizationId: z.string().optional(), // ✅ Optional, as either user or org creates it
  }),
});

export const updatePost = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    urgency: UrgencyEnum.optional(),
    status: HelpStatusEnum.optional(),
    createdById: z.string().optional(),
    createdByOrganizationId: z.string().optional(),
  }),
});


// ✅ Register for Post Validation
const registerPost = z.object({
  body: z.object({
    userId: z.string({ required_error: 'UserId is required' }),
    postId: z.string({ required_error: 'PostId is required' }),
  }),
});

// ✅ Export Validations
export const PostValidation = {
  createPost,
  updatePost,
  registerPost,
};
