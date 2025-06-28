import express from 'express';
const router = express.Router();

import {
    getAllResults,
    getResultById,
    submitResult,
    updateResult,
    deleteResult
} from '../controllers/resultController.js'

import {
    verifyToken,
    isAdmin
}   from '../middlewares/authMiddleware.js'

//Routes list
router.get('/', verifyToken, getAllResults);
router.get('/:id', verifyToken, getResultById);
router.post('/', verifyToken, isAdmin, submitResult);
router.put('/:id', verifyToken, isAdmin, updateResult);
router.delete('/:id', verifyToken, isAdmin, deleteResult); 

export default router;