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

// Create an Express application and store it in a constant named app.
const app = express();

// Forward requests starting with /api/tasks to taskRoute; '/' in that router means /api/tasks.
app.use('/api/tasks', taskRoute);

// Pause this ES module until connectDB finishes; the server starts only after a successful connection.
await connectDB();

// Listen for HTTP requests on port 5001; run this arrow function when the server starts listening.
app.listen(5001, () => {
    // Print a startup message in the terminal; this does not send a response to a browser.
    console.log('Server bắt đầu trên cổng 5001');
}); // Close the callback function and finish the app.listen call.
