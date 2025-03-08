import express from 'express';


import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { StaffController } from './Event.controller';
import { EventValidation } from './Event.validation';

const router = express.Router();

router.get('/:id', StaffController.getById);
router.get('/', StaffController.getAllFromDB);

router.patch(
  '/:id',
  validateRequest(EventValidation.updateEvent),
  StaffController.updateEvent,
);

router.delete('/:id', StaffController.deleteEvent);

export const EventRoutes = router;
