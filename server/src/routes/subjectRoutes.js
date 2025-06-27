import express from 'express';
const router = express.Router();

import {
    getAllSubjects,
    getSubjectById,
    addNewSubject,
    updateSubject,
    deleteSubject
} from '../controllers/subjectController.js'

//Routes list
router.get('/', getAllSubjects);
router.get('/:id', getSubjectById);
router.post('/', addNewSubject);
router.put('/:id', updateSubject);
router.delete('/:id', deleteSubject); 

export default router;