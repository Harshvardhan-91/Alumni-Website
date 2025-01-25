import express from 'express';
import {
  getAllAlumnis,
  getAlumniById,
  createAlumni,
  updateAlumni,
  deleteAlumni,
} from "../controller/alumniController.js";

const router = express.Router();

router.get("/", getAllAlumnis);
router.get("/:id", getAlumniById);
router.post("/", createAlumni);
router.put("/:id", updateAlumni);
router.delete("/:id", deleteAlumni);

export default router;
