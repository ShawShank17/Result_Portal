import express from 'express';
const router = express.Router();

import {
    getAllResults,
    getResultById,
    submitResult,
    updateResult,
    deleteResult
} from '../controllers/resultController.js'

//Routes list
router.get('/', getAllResults);
router.get('/:id', getResultById);
router.post('/', submitResult);
router.put('/:id', updateResult);
router.delete('/:id', deleteResult); 

export default router;