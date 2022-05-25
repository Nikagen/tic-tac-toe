import { Router } from 'express';
import usersController from './../controllers/users.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.route('/')
  .get(authMiddleware, usersController.getUser)
  .post(usersController.signup);

export default router;