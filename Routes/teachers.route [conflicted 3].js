import express from "express";
import {
    createTeacherEntry,
    deleteTeacherEntry,
    listTeachers,
    showTeacher,
    updateTeacherEntry
} from "../Controllers/teachers.controller.js";

const router = express.Router();

router.get("/", listTeachers);
router.get("/:id", showTeacher);
router.post("/", createTeacherEntry);
router.put("/:id", updateTeacherEntry);
router.delete("/:id", deleteTeacherEntry);

export default router;
