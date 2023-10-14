import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/create-user', AuthController.createNewUser);

export const AuthRoutes = router;
