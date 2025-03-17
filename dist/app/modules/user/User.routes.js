"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const User_controller_1 = require("./User.controller");
const User_validation_1 = require("./User.validation");
const router = express_1.default.Router();
router.get('/:id', User_controller_1.UserController.getById);
router.get('/', User_controller_1.UserController.getAllFromDB);
router.patch('/:id', (0, validateRequest_1.default)(User_validation_1.UserValidation.updateUser), User_controller_1.UserController.updateUser);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), User_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
