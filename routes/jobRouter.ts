import { Router } from 'express';
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
} from '../controllers/jobController.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';
import { validateIdParam, validateJobInput } from '../middleware/validationMiddleware.js';
const router = Router();

// router.get('/',getAllJobs)
// router.post('/',createJob)

router.route('/').get(getAllJobs).post(checkForTestUser, validateJobInput, createJob);

// router.route('/stats').get(showStats);

router
  .route('/:id')
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateIdParam, updateJob)
  // .patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
