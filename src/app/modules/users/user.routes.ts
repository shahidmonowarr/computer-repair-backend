import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getUserById);
router.get('/my-profile', UserController.getMyProfile);

export const UserRoutes = router;
