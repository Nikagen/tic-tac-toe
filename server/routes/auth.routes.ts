import { Router } from 'express';
import usersController from './../controllers/users.controller';

const router = Router();

router.route('/')
  .post(usersController.signin)

export default router;