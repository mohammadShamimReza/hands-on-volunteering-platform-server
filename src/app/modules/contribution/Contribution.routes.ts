import express from 'express';


import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { ContributionController } from './Contribution.controller';
import { ContributionValidation } from './Contribution.validation';

const router = express.Router();

router.get('/:id', ContributionController.getById);
router.get('/', ContributionController.getAllFromDB);

router.post(
  '/create',
  validateRequest(ContributionValidation.createContribution),
  ContributionController.createContribution,
);

// router.contribution(
//   '/register-contribution',
//   validateRequest(ContributionValidation.registerContribution),
//   ContributionController.registerContribution,
// );

router.patch(
  '/:id',
  validateRequest(ContributionValidation.updateContribution),
  ContributionController.updateContribution,
);

router.delete('/:id', ContributionController.deleteContribution);

export const ContributionRoutes = router;
