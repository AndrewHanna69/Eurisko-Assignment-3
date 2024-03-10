import { Request, Response, NextFunction } from 'express';
import * as complaintService from '../services/complaintService';

export const submitComplaint = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const complaintData = req.body;
      const newComplaint = await complaintService.submitComplaint(complaintData);
      res.status(201).json(newComplaint);
    } catch (error) {
      next(error);
    }
  };
  
export const getComplaintById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { complaintId } = req.params;
      const complaint = await complaintService.getComplaintById(complaintId);
      if (!complaint) {
        return res.status(404).json({ message: 'Complaint not found' });
      }
      res.json(complaint);
    } catch (error) {
      next(error);
    }
  };
  
export const deleteComplaintById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { complaintId } = req.params;
      await complaintService.deleteComplaintById(complaintId);
      res.json({ message: 'Complaint deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
  
export const getClientComplaints = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const clientComplaints = await complaintService.getClientComplaints(userId);
      res.json(clientComplaints);
    } catch (error) {
      next(error);
    }
  };
  
export const updateComplaintStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { complaintId } = req.params;
      const { newStatus } = req.body;
      const updatedComplaint = await complaintService.updateComplaintStatus(complaintId, newStatus);
      if (!updatedComplaint) {
        return res.status(404).json({ message: 'Complaint not found' });
      }
      res.json(updatedComplaint);
    } catch (error) {
      next(error);
    }
  };

