"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const Contribution_controller_1 = require("./Contribution.controller");
const Contribution_validation_1 = require("./Contribution.validation");
const router = express_1.default.Router();
router.get('/log-hours', Contribution_controller_1.ContributionController.getLogHours);
router.get('/leaderboard', Contribution_controller_1.ContributionController.getLearderboard);
router.get('/UserHour/:id', Contribution_controller_1.ContributionController.getLearderboard);
router.post('/create', (0, validateRequest_1.default)(Contribution_validation_1.ContributionValidation.createContribution), Contribution_controller_1.ContributionController.createContribution);
// router.contribution(
//   '/register-contribution',
//   validateRequest(ContributionValidation.registerContribution),
//   ContributionController.registerContribution,
// );
router.patch('/:id', (0, validateRequest_1.default)(Contribution_validation_1.ContributionValidation.updateContribution), Contribution_controller_1.ContributionController.updateContribution);
router.delete('/:id', Contribution_controller_1.ContributionController.deleteContribution);
exports.ContributionRoutes = router;
