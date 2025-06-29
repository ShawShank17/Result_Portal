import express from 'express';
const router = express.Router();

import {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} from '../controllers/studentController.js';

import {
    verifyToken, 
    isAdmin
} from '../middlewares/authMiddleware.js';

//Routes List
router.get('/', verifyToken, getAllStudents);
router.get('/:id', verifyToken, getStudentById);
router.post('/', verifyToken, isAdmin, createStudent);
router.put('/:id', verifyToken, isAdmin, updateStudent);
router.delete('/:id', verifyToken, isAdmin, deleteStudent);

export default router ;