import express from 'express';


import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { TeamController } from './Team.controller';
import { TeamValidation } from './Team.validation';

const router = express.Router();

router.get('/:id', TeamController.getById);
router.get('/', TeamController.getAllFromDB);
router.get('/get-all-joined-team-by-user/:id', TeamController.getAllJoinedTeamByUser);


router.post(
  '/create',
  validateRequest(TeamValidation.createTeam),
  TeamController.createTeam,
);

router.post(
  '/register-team',
  validateRequest(TeamValidation.registerTeam),
  TeamController.registerTeam,
);

router.patch(
  '/:id',
  validateRequest(TeamValidation.updateTeam),
  TeamController.updateTeam,
);

router.delete('/:id', TeamController.deleteTeam);

export const TeamRoutes = router;
