import express from 'express';
import { authRoutes } from '../modules/auth/Auth.routes';
import { UserRoutes } from '../modules/user/User.routes';

const router = express.Router();

const moduleRoutes = [
  { path: '/auth', routes: authRoutes },

  {
    path: '/user',
    routes: UserRoutes,
  },
];

// ! comment out the below line

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
