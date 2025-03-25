import express from 'express';

import validateRequest from '../../middleware/validateRequest';
import { UserController } from './User.controller';
import { UserValidation } from './User.validation';

const router = express.Router();

router.get('/:id', UserController.getById);
router.get('/', UserController.getAllFromDB);

router.patch(
  '/:id',
  validateRequest(UserValidation.updateUser),
  UserController.updateUser,
);

router.delete('/:id', UserController.deleteUser);

export const UserRoutes = router;
