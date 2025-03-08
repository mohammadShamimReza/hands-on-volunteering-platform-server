import express from 'express';
import { authRoutes } from '../modules/auth/Auth.routes';
import { EventRoutes } from '../modules/event/Event.routes';
import { UserRoutes } from '../modules/user/User.routes';

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
];

// ! comment out the below line

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
