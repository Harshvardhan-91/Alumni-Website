// controllers/AlumniController.js
import Alumni from "../model/Alumni.js";

// Get all Alumnis
const getAllAlumnis = async (req, res) => {
  try {
    const Alumnis = await Alumni.find();
    res.status(200).json(Alumnis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a Alumni by ID
const getAlumniById = async (req, res) => {
  try {
    const Alumni = await Alumni.findById(req.params.id);
    if (!Alumni) return res.status(404).json({ message: "Alumni not found" });
    res.status(200).json(Alumni);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new Alumni
const createAlumni = async (req, res) => {
  try {
    const Alumni = new Alumni(req.body);
    const savedAlumni = await Alumni.save();
    res.status(201).json(savedAlumni);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a Alumni
const updateAlumni = async (req, res) => {
  try {
    const updatedAlumni = await Alumni.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAlumni) return res.status(404).json({ message: "Alumni not found" });
    res.status(200).json(updatedAlumni);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a Alumni
const deleteAlumni = async (req, res) => {
  try {
    const deletedAlumni = await Alumni.findByIdAndDelete(req.params.id);
    if (!deletedAlumni) return res.status(404).json({ message: "Alumni not found" });
    res.status(200).json({ message: "Alumni deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getAllAlumnis, getAlumniById, createAlumni, updateAlumni, deleteAlumni };
