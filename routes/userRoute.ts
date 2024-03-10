import express from 'express';
import * as userController from '../controllers/userController';
const router = express.Router();

router.post('/signup', userController.signUpUser);
router.post('/signin', userController.signInUser);
router.put('/changepassword', userController.changePassword);

export default router;