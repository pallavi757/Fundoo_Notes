import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user for registration
router.post('/userRegistration', newUserValidator, userController.userRegistration);

//route to user login
router.post('/login',userController.login);

export default router;


