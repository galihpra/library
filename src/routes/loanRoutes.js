import express from 'express';
import { borrowBookController, returnBookController } from '../controllers/loanController.js';

const router = express.Router();

router.post('/borrow', borrowBookController);
router.post('/return', returnBookController);

export default router;
