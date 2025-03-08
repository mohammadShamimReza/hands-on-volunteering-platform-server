import express from 'express';
import { authRoutes } from '../modules/auth/Auth.routes';
import { CommentRoutes } from '../modules/comment/Comment.routes';
import { EventRoutes } from '../modules/event/Event.routes';
import { PostRoutes } from '../modules/post/Post.routes';
import { UserRoutes } from '../modules/user/User.routes';
import { TeamRoutes } from '../modules/team/Team.routes';
import { ContributionRoutes } from '../modules/contribution/Contribution.routes';

const router = express.Router();

const moduleRoutes = [
  { path: '/auth', routes: authRoutes },

  {
    path: '/user',
    routes: UserRoutes,
  },
  {
    path: '/event',
    routes: EventRoutes,
  },
  {
    path: '/post',
    routes: PostRoutes,
  },
  {
    path: '/comment',
    routes: CommentRoutes,
  },
  {
    path: '/team',
    routes: TeamRoutes,
  },
  {
    path: '/contribution',
    routes: ContributionRoutes,
  },
];

// ! comment out the below line

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
