"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const Auth_controller_1 = require("./Auth.controller");
const Auth_validation_1 = require("./Auth.validation");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(Auth_validation_1.AuthValidation.create), Auth_controller_1.AuthController.signUp);
router.post('/login', (0, validateRequest_1.default)(Auth_validation_1.AuthValidation.login), Auth_controller_1.AuthController.logIn);
router.get('/me', Auth_controller_1.AuthController.me);
router.patch('/change-password', (0, validateRequest_1.default)(Auth_validation_1.AuthValidation.changePasswordZodSchema), Auth_controller_1.AuthController.changePassword);
router.post('/forgot-password', Auth_controller_1.AuthController.forgotPass);
router.post('/reset-password', Auth_controller_1.AuthController.resetPassword);
exports.authRoutes = router;
