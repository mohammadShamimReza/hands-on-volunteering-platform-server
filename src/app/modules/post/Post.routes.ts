import express from 'express';


import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { PostController } from './Post.controller';
import { PostValidation } from './Post.validation';

const router = express.Router();

router.get('/:id', PostController.getById);
router.get('/', PostController.getAllFromDB);

router.post(
  '/create',
  validateRequest(PostValidation.createPost),
  PostController.createPost,
);

// router.post(
//   '/register-post',
//   validateRequest(PostValidation.registerPost),
//   PostController.registerPost,
// );

router.patch(
  '/:id',
  validateRequest(PostValidation.updatePost),
  PostController.updatePost,
);

router.delete('/:id', PostController.deletePost);

export const PostRoutes = router;
