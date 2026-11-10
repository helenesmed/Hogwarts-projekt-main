import express from "express";
import {
    enrollStudent,
    removeEnrolledStudent
} from "../Controllers/courses.controller.js";

const router = express.Router();

router.post("/:id/students", enrollStudent);
router.delete("/:id/students/:studentId", removeEnrolledStudent);

export default router;
