// Import Express, the library used to create the HTTP server and register routes.
import express from 'express';
// Import the default router exported by tasksRoutes.js; taskRoute is its local name.
import taskRoute from './routes/tasksRoutes.js';
// Import the named connectDB function; named imports use curly braces.
import { connectDB } from './config/db.js';
// Import dotenv, which reads environment variables from a .env file.
import dotenv from 'dotenv';

// Load .env from the working directory into process.env before connecting to MongoDB.
dotenv.config();

// Use the port from the environment, or fall back to 5001 when no port is configured.
const PORT = process.env.PORT || 5001;

// Create an Express application and store it in a constant named app.
const app = express();

// Parse incoming JSON request bodies into req.body before the task routes handle them.
app.use(express.json());

// Forward requests starting with /api/tasks to taskRoute; '/' in that router means /api/tasks.
app.use('/api/tasks', taskRoute);

// Previous version: await the database connection, then start the server in a separate statement.
// await connectDB();
// app.listen(5001, () => {
//     console.log(`Server bắt đầu trên cổng ${PORT}`);
// });
// This version listened on the fixed port 5001, even when PORT had a different value.

// Current version: start the server inside the callback passed to .then().
// connectDB() returns a Promise; .then() runs this callback after that Promise fulfills.
// await waits for the Promise returned by .then(); it is optional here because no code follows.
await connectDB().then(() => {
    // Listen on PORT so the actual listening port matches the environment setting and log message.
    app.listen(PORT, () => {
        // Run this callback when the server starts listening and print its port in the terminal.
        console.log(`Server bắt đầu trên cổng ${PORT}`);
    }); // Close the listening callback and finish the app.listen call.
}) // Close the database callback and finish the .then() call.
// Both versions wait for connectDB() before starting the server; .then() is an alternative style.
