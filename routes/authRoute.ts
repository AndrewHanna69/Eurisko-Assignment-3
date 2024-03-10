import express from 'express';
import { forgetPassword, verifyOTP, resendOTP, resetPassword } from '../controllers/authController';

const router = express.Router();

router.post('/forget-password', forgetPassword);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP); 
router.post('/reset-password', resetPassword);

export default router;