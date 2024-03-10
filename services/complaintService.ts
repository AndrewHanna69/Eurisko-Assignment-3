import Complaint, { IComplaint } from '../models/complaint';

export const submitComplaint = async (complaintData: Partial<IComplaint>): Promise<IComplaint> => {
  return await Complaint.create(complaintData);
};

export const getComplaintById = async (complaintId: string): Promise<IComplaint | null> => {
  return await Complaint.findById(complaintId);
};

export const deleteComplaintById = async (complaintId: string): Promise<void> => {
  await Complaint.findByIdAndDelete(complaintId);
};

export const getClientComplaints = async (userId: string): Promise<IComplaint[]> => {
  return await Complaint.find({ userId });
};

export const updateComplaintStatus = async (complaintId: string, newStatus: string): Promise<IComplaint | null> => {
  return await Complaint.findByIdAndUpdate(complaintId, { status: newStatus }, { new: true });
};