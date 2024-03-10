import express from 'express';
import { authorizeAdmin } from '../middlewares/authorizeAdmin';
import * as complaintCategoryController from '../controllers/complaintCategoryController';

const router = express.Router();

router.get('/complaint-categories/admin', authorizeAdmin, complaintCategoryController.getClientComplaintCategoriesPaginated);
router.get('/complaint-categories/:categoryId', authorizeAdmin, complaintCategoryController.getClientComplaintCategoryDetails);

router.post('/complaint-categories', authorizeAdmin, complaintCategoryController.addComplaintCategory);
router.put('/complaint-categories/:categoryId', authorizeAdmin, complaintCategoryController.updateComplaintCategory);
router.delete('/complaint-categories/:categoryId', authorizeAdmin, complaintCategoryController.deleteComplaintCategory);

export default router;