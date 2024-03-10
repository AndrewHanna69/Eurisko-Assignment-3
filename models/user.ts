import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isVIP: boolean;
    isAdmin: boolean;
  }

  const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isVIP: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }
  });
  
export default mongoose.model<IUser>('User', userSchema);