import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidations } from './auth.validations';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(AuthValidations.createUser),
  AuthController.createNewUser
);

router.post(
  '/login',
  validateRequest(AuthValidations.loginUser),
  AuthController.userLogin
);

router.post('/refresh-token', AuthController.refreshToken);

export const AuthRoutes = router;
