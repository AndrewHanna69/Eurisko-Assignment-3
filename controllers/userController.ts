import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';

export const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const newUser = await userService.signUpUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const token = await userService.signInUser(email, password);
    if (!token) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.authenticateUser(req);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const { newPassword } = req.body;
    await userService.changePassword(userId, newPassword);
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
};
