import { Result } from "../models/Result.models.js";

export const getAllResults = async (req, res) => {
    const result = await Result.find();
    res.status(201).json(result);
}

export const getResultById = async (req, res) => {
    const result = await Result.findById();
    res.status(201).json(result);
}

export const submitResult = async (req, res) => {
    const newResult = new Result(req.body);
    await newResult.save();
    res.status(201).json(newResult);
}

export const updateResult = async (req, res) => {
    try{
        const updated = await Result.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if(!updated){
            return res.status(500).json({message: "Result not found"});
        }
        res.json(updated);
    }
    catch(err){
        res.status(404).json({message: "Unsuccessful"});
    }
}

export const deleteResult = async (req, res) => {
    try{
        const deleted = await Result.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Result not found" });
        res.json({ message: "Result deleted successfully" });
    }
    catch(err){
        res.status(500).json(err);
    }
}