"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const Post_controller_1 = require("./Post.controller");
const Post_validation_1 = require("./Post.validation");
const router = express_1.default.Router();
router.get('/:id', Post_controller_1.PostController.getById);
router.get('/user/:id', Post_controller_1.PostController.getPostByUserId);
router.get('/team/:id', Post_controller_1.PostController.getPostByTeamId);
router.get('/', Post_controller_1.PostController.getAllFromDB);
router.post('/create', (0, validateRequest_1.default)(Post_validation_1.PostValidation.createPost), Post_controller_1.PostController.createPost);
// router.post(
//   '/register-post',
//   validateRequest(PostValidation.registerPost),
//   PostController.registerPost,
// );
router.patch('/:id', (0, validateRequest_1.default)(Post_validation_1.PostValidation.updatePost), Post_controller_1.PostController.updatePost);
router.delete('/:id', Post_controller_1.PostController.deletePost);
exports.PostRoutes = router;
