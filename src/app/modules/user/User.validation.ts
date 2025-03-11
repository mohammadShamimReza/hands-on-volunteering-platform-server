import { z } from 'zod';

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

const updateUser = z.object({
  body: z.object({
    fullName: z.string().optional(),
    email: z.string().email({ message: 'Invalid email format' }).optional(),

    bio: z.string().optional(),
    profileImage: z
      .string()
      .optional(),
    skills: z.array(SkillsEnum).optional(),
    causes: z.array(CausesEnum).optional(),
  }),
});

export const UserValidation = {
  updateUser,
};
