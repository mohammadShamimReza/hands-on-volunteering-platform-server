import { z } from 'zod';

// ✅ Enum Validation for Team Type
export const TeamTypeEnum = z.enum(['PUBLIC', 'PRIVATE']);

export const createTeam = z.object({
  body: z.object({
    name: z.string({ required_error: 'Team name is required' }),
    description: z.string().optional(),
    type: TeamTypeEnum.default('PUBLIC'), // Default is PUBLIC
    createdById: z.string({
      required_error: 'CreatedById (User ID) is required',
    }),
  }),
});


export const updateTeam = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    type: TeamTypeEnum.optional(),
  }),
});

const registerTeam = z.object({
  body: z.object({
    userId: z.string({ required_error: 'UserId is required' }),
    teamId: z.string({ required_error: 'TeamId is required' }),
  }),
});

export const TeamValidation = {
  createTeam,
  updateTeam,
  registerTeam,
};
