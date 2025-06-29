import express from 'express';
const router = express.Router();

import {
    getAllSubjects,
    getSubjectById,
    addNewSubject,
    updateSubject,
    deleteSubject
} from '../controllers/subjectController.js'

import {
    verifyToken,
    isAdmin
} from '../middlewares/authMiddleware.js';

//Routes list
router.get('/', verifyToken, getAllSubjects);
router.get('/:id', verifyToken, getSubjectById);
router.post('/', verifyToken, isAdmin, addNewSubject);
router.put('/:id', verifyToken, isAdmin, updateSubject);
router.delete('/:id', verifyToken, isAdmin, deleteSubject); 

export default router;