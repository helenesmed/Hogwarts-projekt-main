import { Router } from "express";
import {
    enrollStudent,
    removeEnrolledStudent
} from "../Controllers/courses.controller.js";

const router = Router();

router.post("/:id/students", enrollStudent);
router.delete("/:id/students/:studentId", removeEnrolledStudent);

export default router;
