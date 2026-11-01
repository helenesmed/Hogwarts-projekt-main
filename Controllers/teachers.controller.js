import {
    createTeacher,
    deleteTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher
} from "../Repository/teachers.repository.js";

export async function listTeachers(req, res) {
    try {
        res.status(200).json(await getAllTeachers());
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function showTeacher(req, res) {
    try {
        const teacher = await getTeacherById(req.params.id);
        if (!teacher) {
            return res.status(404).send({ message: "Teacher not found" });
        }
        res.status(200).json(teacher);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function createTeacherEntry(req, res) {
    if (!req.body.name) {
        return res.status(400).send({ message: "name is required" });
    }
    try {
        res.status(201).json(await createTeacher(req.body.name, req.body.house_id));
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function updateTeacherEntry(req, res) {
    if (!req.body.name) {
        return res.status(400).send({ message: "name is required" });
    }
    try {
        const teacher = await updateTeacher(req.params.id, req.body.name, req.body.house_id);
        if (!teacher) {
            return res.status(404).send({ message: "Teacher not found" });
        }
        res.status(200).json(teacher);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function deleteTeacherEntry(req, res) {
    try {
        const deleted = await deleteTeacher(req.params.id);
        if (!deleted) {
            return res.status(404).send({ message: "Teacher not found" });
        }
        res.status(200).send({ message: "Teacher deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}
