import express from 'express';
import { getAlumni } from '../controller/alumniController.js';
import Alumni from '../model/alumniModel.js';

const router = express.Router();

// Add test routes
router.get('/test', async (req, res) => {
  try {
    const count = await Alumni.countDocuments();
    const sample = await Alumni.findOne();
    res.json({ 
      message: 'Alumni route working', 
      count,
      sampleData: sample 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', getAlumni);

export default router;
