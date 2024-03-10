import { Request, Response, NextFunction } from 'express';

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user || !user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }

  next();
};