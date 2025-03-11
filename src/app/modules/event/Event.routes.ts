import express from 'express';


import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { EventController } from './Event.controller';
import { EventValidation } from './Event.validation';

const router = express.Router();

router.get('/:id', EventController.getById);
router.get('/', EventController.getAllFromDB);
router.get(
  '/get-event-created-user/:id',
  EventController.getAllEventCreateByUser,
);


router.get('/get-registered-event-by-user/:id', EventController.getAllRegisteredEventByUser);


router.post(
  '/create',
  validateRequest(EventValidation.createEvent),
  EventController.createEvent,
);

router.post(
  '/register-event',
  validateRequest(EventValidation.registerEvent),
  EventController.registerEvent,
);

router.patch(
  '/:id',
  validateRequest(EventValidation.updateEvent),
  EventController.updateEvent,
);

router.delete('/:id', EventController.deleteEvent);

export const EventRoutes = router;
