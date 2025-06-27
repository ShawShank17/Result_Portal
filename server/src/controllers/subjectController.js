import { Subject } from '../models/Subject.models.js'

export const getAllSubjects = async (requestAnimationFrame, res) => {
    const subject = await Subject.find();
    res.json(subject);
}

export const addNewSubject = async (req, res) => {
    const subject = new Subject(req.body);
    await subject.save();
    res.json(subject);
}

export const getSubjectById = async (req, res) => {
    try{
        const subject = await Subject.findById(req.params.id);
        if(!subject){
            return res.status(404).status({message: "Subject Not Found"});
        }
        res.json(subject);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

export const deleteSubject = async (req, res) => {
    try{
        const deleted = await Subject.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({message: "Subject Not found"})
        res.status(201).json(deleted);
    }
    catch(err){
        res.status(404).json({message: "Subject Not Found"});
    }
}

export const updateSubject = async (req, res) => {
    try{
        const updated = await Subject.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if(!updated) return res.status(404).json({message: "Subject Not Found"});
        res.status(201).json(updated);
    }
    catch(err){
        res.status(404).json({message: "Subject Not Found"});
    }
}