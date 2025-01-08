import express from "express";
import { getAllTasks, createNewTask, updateTask, deleteTask } from "../controllers/todo.controller.js";
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.use(isAuthenticated); // Protect all routes below

router.route("/").get(getAllTasks).post(createNewTask);
router.route("/:id").put(updateTask).delete(deleteTask);

export default router;
