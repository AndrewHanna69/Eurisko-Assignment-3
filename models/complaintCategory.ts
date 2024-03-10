import mongoose, { Document, Schema } from 'mongoose';

export interface IComplaintCategory extends Document {
  name: string;
  description: string;
  createdBy: string; 
}

const complaintCategorySchema = new Schema({
  name: String,
  description: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }
});

export default mongoose.model<IComplaintCategory>('ComplaintCategory', complaintCategorySchema);