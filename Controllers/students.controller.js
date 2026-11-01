import {
    createStudent,
    deleteStudent,
    getAllStudents,
    getStudentById,
    updateStudent
} from "../Repository/students.repository.js";

export async function listStudents(req, res) {
    try {
        res.status(200).json(await getAllStudents());
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function showStudent(req, res) {
    try {
        const student = await getStudentById(req.params.id);
        if (!student) {
            return res.status(404).send({ message: "Student not found" });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function createStudentEntry(req, res) {
    if (!req.body.name) {
        return res.status(400).send({ message: "name is required" });
    }
    try {
        res.status(201).json(await createStudent(req.body.name, req.body.year, req.body.house_id));
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function updateStudentEntry(req, res) {
    if (!req.body.name) {
        return res.status(400).send({ message: "name is required" });
    }
    try {
        const student = await updateStudent(
            req.params.id,
            req.body.name,
            req.body.year,
            req.body.house_id
        );
        if (!student) {
            return res.status(404).send({ message: "Student not found" });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function deleteStudentEntry(req, res) {
    try {
        const deleted = await deleteStudent(req.params.id);
        if (!deleted) {
            return res.status(404).send({ message: "Student not found" });
        }
        res.status(200).send({ message: "Student deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}
