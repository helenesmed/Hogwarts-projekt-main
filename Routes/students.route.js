import { Router } from "express";
import {
    createStudentEntry,
    deleteStudentEntry,
    listStudents,
    showStudent,
    updateStudentEntry
} from "../Controllers/students.controller.js";

const router = Router();

router.get("/", listStudents);
router.get("/:id", showStudent);
router.post("/", createStudentEntry);
router.put("/:id", updateStudentEntry);
router.delete("/:id", deleteStudentEntry);

export default router;
