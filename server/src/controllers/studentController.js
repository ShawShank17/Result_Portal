import { Student } from '../models/Student.models.js';

export const getAllStudents = async (req, res) => {
    const students = await Student.find();
    res.json(students);
};

export const addStudent = async (req, res) => {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
}

export const getStudentById = async (req, res) => {
    try{
        const student = await Student.findById(req.params.id);
        if(!student){
            return res.status(404).status({message: "Student Not Found"});
        }
        res.json(student);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

export const createStudent = async (req, res) => {
    try{
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
};

export const updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Student not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};