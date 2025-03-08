import express from 'express';


import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { CommentController } from './Comment.controller';
import { CommentValidation } from './Comment.validation';

const router = express.Router();

router.get('/:id', CommentController.getById);
router.get('/', CommentController.getAllFromDB);

router.post(
  '/create',
  validateRequest(CommentValidation.createComment),
  CommentController.createComment,
);

// router.comment(
//   '/register-comment',
//   validateRequest(CommentValidation.registerComment),
//   CommentController.registerComment,
// );

router.patch(
  '/:id',
  validateRequest(CommentValidation.updateComment),
  CommentController.updateComment,
);

router.delete('/:id', CommentController.deleteComment);

export const CommentRoutes = router;
