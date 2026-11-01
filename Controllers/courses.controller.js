import {
    addStudentToCourse,
    createCourse,
    deleteCourse,
    getAllCourses,
    getCourseById,
    removeStudentFromCourse,
    updateCourseName,
    updateCourseTeacher
} from "../Repository/courses.repository.js";
import { getStudentById } from "../Repository/students.repository.js";
import { getTeacherById } from "../Repository/teachers.repository.js";

export async function listCourses(req, res) {
    try {
        res.status(200).json(await getAllCourses());
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function showCourse(req, res) {
    try {
        const course = await getCourseById(req.params.id);
        if (!course) {
            return res.status(404).send({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function createCourseEntry(req, res) {
    if (!req.body.name) {
        return res.status(400).send({ message: "name is required" });
    }
    try {
        res.status(201).json(await createCourse(req.body.name, req.body.teacher_id));
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function updateCourseEntry(req, res) {
    if (!req.body.name) {
        return res.status(400).send({ message: "name is required" });
    }
    try {
        const course = await updateCourseName(req.params.id, req.body.name);
        if (!course) {
            return res.status(404).send({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function deleteCourseEntry(req, res) {
    try {
        const deleted = await deleteCourse(req.params.id);
        if (!deleted) {
            return res.status(404).send({ message: "Course not found" });
        }
        res.status(200).send({ message: "Course deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function changeCourseTeacher(req, res) {
    if (!req.body.teacher_id) {
        return res.status(400).send({ message: "teacher_id is required" });
    }
    try {
        const teacher = await getTeacherById(req.body.teacher_id);
        if (!teacher) {
            return res.status(404).send({ message: "Teacher not found" });
        }
        const course = await updateCourseTeacher(req.params.id, req.body.teacher_id);
        if (!course) {
            return res.status(404).send({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function enrollStudent(req, res) {
    if (!req.body.student_id) {
        return res.status(400).send({ message: "student_id is required" });
    }
    try {
        const course = await getCourseById(req.params.id);
        if (!course) {
            return res.status(404).send({ message: "Course not found" });
        }
        const student = await getStudentById(req.body.student_id);
        if (!student) {
            return res.status(404).send({ message: "Student not found" });
        }
        const enrollment = await addStudentToCourse(req.params.id, req.body.student_id);
        res.status(201).json(enrollment);
    } catch (error) {
        if (error?.code === "23505") {
            return res.status(409).send({ message: "Student already in course" });
        }
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function removeEnrolledStudent(req, res) {
    try {
        const deleted = await removeStudentFromCourse(req.params.id, req.params.studentId);
        if (!deleted) {
            return res.status(404).send({ message: "Student is not in this course" });
        }
        res.status(200).send({ message: "Student removed from course" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}
