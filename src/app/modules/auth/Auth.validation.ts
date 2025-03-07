import { z } from 'zod';

export const create = z.object({
  body: z.object({
    fullName: z.string({
      required_error: 'Full Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Password must be at least 8 characters'),
    bio: z.string().optional(),
    role: z.enum(['USER', 'ADMIN', 'ORG'], {
      required_error: 'Role is required',
    }),
    profileImage: z.string().url('Invalid URL format').optional(),
    skills: z.string({
      required_error: 'Skills are required',
    }),
    causes: z.string({
      required_error: 'Causes are required',
    }),
  }),
});


const login = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    role: z.string({ required_error: 'role is required' }), // Role is optional in the model
  }),
});

const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password  is required',
    }),
    newPassword: z.string({
      required_error: 'New password  is required',
    }),
  }),
});

export const AuthValidation = {
  create,
  login,
  changePasswordZodSchema,
};






