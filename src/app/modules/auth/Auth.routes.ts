import express from 'express';


import validateRequest from '../../middleware/validateRequest';
import { AuthController } from './Auth.controller';
import { AuthValidation } from './Auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.create),
  AuthController.signUp,
);
router.post(
  '/login',
  validateRequest(AuthValidation.login),
  AuthController.logIn,
);

router.get('/me', AuthController.me);

router.patch(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  AuthController.changePassword,
);

router.post('/forgot-password', AuthController.forgotPass);

router.post('/reset-password', AuthController.resetPassword);

export const authRoutes = router;
