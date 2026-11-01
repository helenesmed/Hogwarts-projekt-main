import express from "express";
import coursesRoutes from "./Routes/courses.route.js";
import courseStudentsRoutes from "./Routes/courses.students.js";
import housesRoutes from "./Routes/houses.route.js";
import studentsRoutes from "./Routes/students.route.js";
import teachersRoutes from "./Routes/teachers.route.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
        <h1>Hogwarts</h1>
        <ul>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/teachers">Teachers</a></li>
            <li><a href="/students">Students</a></li>
            <li><a href="/houses">Houses</a></li>
        </ul>
    `);
});

app.use("/houses", housesRoutes);
app.use("/teachers", teachersRoutes);
app.use("/students", studentsRoutes);
app.use("/courses", coursesRoutes);
app.use("/courses", courseStudentsRoutes);

export default app;
