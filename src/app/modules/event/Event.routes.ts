import express from 'express';


import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { EventController } from './Event.controller';
import { EventValidation } from './Event.validation';

const router = express.Router();

router.get('/:id', EventController.getById);
router.get('/', EventController.getAllFromDB);

router.post(
  '/create',
  validateRequest(EventValidation.createEvent),
  EventController.createEvent,
);

router.patch(
  '/:id',
  validateRequest(EventValidation.updateEvent),
  EventController.updateEvent,
);

router.delete('/:id', EventController.deleteEvent);

export const EventRoutes = router;
