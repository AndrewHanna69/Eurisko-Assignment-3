import express from 'express';
import * as complaintController from '../controllers/complaintController';
import { authenticateUser } from '../middlewares/authenticateUser';
import { authorizeAdmin } from '../middlewares/authorizeAdmin';

const router = express.Router();

router.post('/complaints', authenticateUser, complaintController.submitComplaint );
router.get('/complaints/:id', authenticateUser, complaintController.getComplaintById);
router.delete('/complaints/:id',authenticateUser, complaintController.deleteComplaintById);
router.get('/complaints', authenticateUser, complaintController.getClientComplaints);
router.put('/complaints/:complaintId/status', authorizeAdmin, complaintController.updateComplaintStatus);

export default router;