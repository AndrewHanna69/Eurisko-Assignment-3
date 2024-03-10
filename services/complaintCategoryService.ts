import ComplaintCategory, { IComplaintCategory } from '../models/complaintCategory';

export const getClientComplaintCategoriesPaginated = async (page: number, limit: number): Promise<IComplaintCategory[]> => {
  const categories = await ComplaintCategory.find()
    .skip((page - 1) * limit)
    .limit(limit);
  return categories;
};

export const getClientComplaintCategoryDetails = async (categoryId: string): Promise<IComplaintCategory | null> => {
  const category = await ComplaintCategory.findById(categoryId);
  return category;
};

export const addComplaintCategory = async (name: string): Promise<IComplaintCategory> => {
  const newCategory = new ComplaintCategory({ name });
  return await newCategory.save();
};

export const updateComplaintCategory = async (categoryId: string, name: string): Promise<IComplaintCategory | null> => {
  return await ComplaintCategory.findByIdAndUpdate(categoryId, { name }, { new: true });
};

export const deleteComplaintCategory = async (categoryId: string): Promise<IComplaintCategory | null> => {
  return await ComplaintCategory.findByIdAndDelete(categoryId);
};