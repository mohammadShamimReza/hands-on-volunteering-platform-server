import { z } from 'zod';

// ✅ Define ENUMS for skills and causes
export const SkillsEnum = z.enum([
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
    skills: z
      .array(SkillsEnum, {
        required_error: 'At least one skill is required',
      })
      .min(1, 'At least one skill must be selected'),

    causes: z
      .array(CausesEnum, {
        required_error: 'At least one cause is required',
      })
      .min(1, 'At least one cause must be selected'),
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
