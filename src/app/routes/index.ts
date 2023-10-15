import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { RepairServiceRoutes } from '../modules/services/service.routes';
import { SlotRoutes } from '../modules/slots/slots.routes';
import { UserRoutes } from '../modules/users/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/services',
    route: RepairServiceRoutes,
  },
  {
    path: '/slots',
    route: SlotRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
