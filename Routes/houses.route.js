import express from "express";
import { listHouses, showHouse } from "../Controllers/houses.controller.js";

const router = express.Router();

router.get("/", listHouses);
router.get("/:id", showHouse);

export default router;
