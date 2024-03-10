import { Request, Response, NextFunction } from 'express';
import { sendOTPByEmail } from '../services/authService';

const otpDatabase: { [email: string]: string } = {};

export const forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    await sendOTPByEmail(email, otp);
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, otp } = req.body;
      const storedOTP = otpDatabase[email];
      if (!storedOTP || storedOTP !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
      delete otpDatabase[email];
      res.json({ message: 'OTP verified successfully' });
    } catch (error) {
      next(error);
    }
  };

export const resendOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const otp = Math.floor(100000 + Math.random() * 900000);
      otpDatabase[email] = otp.toString();
      await sendOTPByEmail(email, otp);
      res.json({ message: 'New OTP sent successfully' });
    } catch (error) {
      next(error);
    }
  };

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, otp, newPassword } = req.body;
      const storedOTP = otpDatabase[email];
      if (!storedOTP || storedOTP !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
      console.log(`Password reset for ${email}. New password: ${newPassword}`);
      delete otpDatabase[email];
      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      next(error);
    }
  };