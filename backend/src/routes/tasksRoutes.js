// Import Express so this file can create a router.
import express from 'express';
// Import four named controller functions; each function handles one type of task request.
import { createTask, deleteTask, getAllTasks, updateTask } from '../controllers/tasksControllers.js';

// Create a router that groups related routes before server.js attaches it to the application.
const router = express.Router();

// Handle GET /api/tasks by passing getAllTasks to Express; Express calls it when a request arrives.
router.get("/", getAllTasks);

// Handle POST /api/tasks with createTask; POST is normally used to create a resource.
router.post("/", createTask);

// Handle PUT /api/tasks/:id with updateTask; an ID such as /123 is available as req.params.id.
router.put("/:id", updateTask);

// Handle DELETE /api/tasks/:id with deleteTask; :id is a variable URL segment, not literal text.
router.delete("/:id", deleteTask);

// Export this router as the default value so server.js can import it using a local name.
export default router;
