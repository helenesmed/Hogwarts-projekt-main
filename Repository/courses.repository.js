import pool from "../db.js";

export async function getAllCourses() {
    const result = await pool.query("SELECT * FROM courses");
    return result.rows;
}

export async function getCourseById(id) {
    const result = await pool.query(
        "SELECT courses.id, courses.name, courses.teacher_id, teachers.name AS teacher_name " +
        "FROM courses LEFT JOIN teachers ON courses.teacher_id = teachers.id " +
        "WHERE courses.id = $1",
        [id]
    );

    if (result.rows.length === 0) {
        return undefined;
    }

    const students = await pool.query(
        "SELECT students.id, students.name " +
        "FROM course_students JOIN students ON course_students.student_id = students.id " +
        "WHERE course_students.course_id = $1",
        [id]
    );

    return { ...result.rows[0], students: students.rows };
}

export async function createCourse(name, teacherId) {
    const result = await pool.query(
        "INSERT INTO courses (name, teacher_id) VALUES ($1, $2) RETURNING *",
        [name, teacherId]
    );
    return result.rows[0];
}

export async function updateCourseName(id, name) {
    const result = await pool.query(
        "UPDATE courses SET name = $1 WHERE id = $2 RETURNING *",
        [name, id]
    );
    return result.rows[0];
}

export async function deleteCourse(id) {
    const result = await pool.query("DELETE FROM courses WHERE id = $1", [id]);
    return result.rowCount;
}

export async function updateCourseTeacher(id, teacherId) {
    const result = await pool.query(
        "UPDATE courses SET teacher_id = $1 WHERE id = $2 RETURNING *",
        [teacherId, id]
    );
    return result.rows[0];
}

export async function addStudentToCourse(courseId, studentId) {
    const result = await pool.query(
        "INSERT INTO course_students (course_id, student_id) VALUES ($1, $2) RETURNING *",
        [courseId, studentId]
    );
    return result.rows[0];
}

export async function removeStudentFromCourse(courseId, studentId) {
    const result = await pool.query(
        "DELETE FROM course_students WHERE course_id = $1 AND student_id = $2",
        [courseId, studentId]
    );
    return result.rowCount;
}
