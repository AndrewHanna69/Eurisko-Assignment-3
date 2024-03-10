import User, { IUser } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';


export const signUpUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const { password, ...rest } = userData;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return await User.create({ ...rest, password: hashedPassword });
};

export const signInUser = async (email: string, password: string): Promise<string | null> => {
  const user = await User.findOne({ email });
  if (!user) {
    return null; 
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null; 
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
  return token;
};

export const authenticateUser = async (req: Request): Promise<IUser | null> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return null;
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findById(decoded.id);
    return user;
  } catch (error) {
    return null;
  }
};

export const changePassword = async (userId: string, newPassword: string): Promise<void> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  await User.findByIdAndUpdate(userId, { password: hashedPassword });
};

