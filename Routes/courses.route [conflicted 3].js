import express from "express";
import {
    changeCourseTeacher,
    createCourseEntry,
    deleteCourseEntry,
    listCourses,
    showCourse,
    updateCourseEntry
} from "../Controllers/courses.controller.js";

const router = express.Router();

router.get("/", listCourses);
router.get("/:id", showCourse);
router.post("/", createCourseEntry);
router.put("/:id", updateCourseEntry);
router.delete("/:id", deleteCourseEntry);
router.put("/:id/teacher", changeCourseTeacher);

export default router;
