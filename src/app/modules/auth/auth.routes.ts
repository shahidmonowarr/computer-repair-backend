import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/create-user', AuthController.createNewUser);

router.post('/login', AuthController.userLogin);

router.post('/refresh-token', AuthController.refreshToken);

export const AuthRoutes = router;
