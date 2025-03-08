import { z } from 'zod';

// ✅ Validation for Creating a Comment
export const createComment = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User ID is required' }),
    postId: z.string({ required_error: 'Post ID is required' }),
    message: z.string().optional(), // Message is optional
  }),
});

export const updateComment = z.object({
  body: z.object({
    message: z.string().optional(), // Allow updating only the message
  }),
});


export const CommentValidation = {
  createComment,
  updateComment,
};
