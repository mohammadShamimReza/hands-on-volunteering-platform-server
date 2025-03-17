"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_routes_1 = require("../modules/auth/Auth.routes");
const Comment_routes_1 = require("../modules/comment/Comment.routes");
const Event_routes_1 = require("../modules/event/Event.routes");
const Post_routes_1 = require("../modules/post/Post.routes");
const User_routes_1 = require("../modules/user/User.routes");
const Team_routes_1 = require("../modules/team/Team.routes");
const Contribution_routes_1 = require("../modules/contribution/Contribution.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    { path: '/auth', routes: Auth_routes_1.authRoutes },
    {
        path: '/user',
        routes: User_routes_1.UserRoutes,
    },
    {
        path: '/event',
        routes: Event_routes_1.EventRoutes,
    },
    {
        path: '/post',
        routes: Post_routes_1.PostRoutes,
    },
    {
        path: '/comment',
        routes: Comment_routes_1.CommentRoutes,
    },
    {
        path: '/team',
        routes: Team_routes_1.TeamRoutes,
    },
    {
        path: '/contribution',
        routes: Contribution_routes_1.ContributionRoutes,
    },
];
// ! comment out the below line
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
