import { Request, Response, NextFunction } from 'express';
import * as complaintCategoryService from '../services/complaintCategoryService';

export const getClientComplaintCategoriesPaginated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const categories = await complaintCategoryService.getClientComplaintCategoriesPaginated(parseInt(page as string), parseInt(limit as string));
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const getClientComplaintCategoryDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryId } = req.params;
    const category = await complaintCategoryService.getClientComplaintCategoryDetails(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Complaint category not found' });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const addComplaintCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const newCategory = await complaintCategoryService.addComplaintCategory(name);
    res.status(201).json({ message: 'Complaint category added successfully', category: newCategory });
  } catch (error) {
    next(error);
  }
};

export const updateComplaintCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const updatedCategory = await complaintCategoryService.updateComplaintCategory(categoryId, name);
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Complaint category not found' });
    }
    res.json({ message: 'Complaint category updated successfully', category: updatedCategory });
  } catch (error) {
    next(error);
  }
};

export const deleteComplaintCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await complaintCategoryService.deleteComplaintCategory(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Complaint category not found' });
    }
    res.json({ message: 'Complaint category deleted successfully' });
  } catch (error) {
    next(error);
  }
};