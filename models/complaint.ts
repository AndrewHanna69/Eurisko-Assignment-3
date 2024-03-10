import mongoose, { Document, Schema } from 'mongoose';

export interface IComplaint extends Document {
  title: string;
  description: string;
  categories: string[];
  status: 'PENDING' | 'INPROGRESS' | 'RESOLVED' | 'REJECTED';
}

const complaintSchema = new Schema({
  title: String,
  description: String,
  categories: [String],
  status: { type: String, enum: ['PENDING', 'INPROGRESS', 'RESOLVED', 'REJECTED'], default: 'PENDING' }
});

export default mongoose.model<IComplaint>('Complaint', complaintSchema);