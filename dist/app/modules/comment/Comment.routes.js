"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const Comment_controller_1 = require("./Comment.controller");
const Comment_validation_1 = require("./Comment.validation");
const router = express_1.default.Router();
router.get('/:id', Comment_controller_1.CommentController.getById);
router.get('/', Comment_controller_1.CommentController.getAllFromDB);
router.post('/create', (0, validateRequest_1.default)(Comment_validation_1.CommentValidation.createComment), Comment_controller_1.CommentController.createComment);
// router.comment(
//   '/register-comment',
//   validateRequest(CommentValidation.registerComment),
//   CommentController.registerComment,
// );
router.patch('/:id', (0, validateRequest_1.default)(Comment_validation_1.CommentValidation.updateComment), Comment_controller_1.CommentController.updateComment);
router.delete('/:id', Comment_controller_1.CommentController.deleteComment);
exports.CommentRoutes = router;
