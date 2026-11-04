// Import the Task model, which provides methods for reading and changing MongoDB task documents.
import Task from '../models/Task.js';

// Export an async GET handler; req contains request data and res is used to send the response.
export const getAllTasks = async (req, res) => {
  // Run database operations inside try so errors can be handled by the catch block.
  try {
    // Alternative: fetch all tasks without specifying their order.
    // const tasks = await Task.find();
    // Fetch all tasks and sort by createdAt in descending order (-1), so the newest tasks appear first.
    const tasks = await Task.find().sort({ createdAt: -1 });
    // Alternative: 'desc' is the string equivalent of -1 and also returns newest tasks first.
    // const tasks = await Task.find().sort({ createdAt: 'desc' });
    // Alternative: 'asc' is the string equivalent of 1 and returns oldest tasks first.
    // const tasks = await Task.find().sort({ createdAt: 'asc' });
    // Keep these alternatives commented out; use only one const tasks declaration in this block.
    // Uncomment the next line only to practice testing the catch block.
    // throw new Error('System error');
    // Send the task array as JSON with HTTP status 200 (OK).
    res.status(200).json(tasks);
  // Catch errors thrown in try, including rejected database operations awaited above.
  } catch (error) {
    // Log the handler name and original error in the server terminal for debugging.
    console.log('Lỗi khi gọi getAllTasks', error);
    // Send a general error message with HTTP status 500 (Internal Server Error).
    res.status(500).json({message: 'Lỗi hệ thống'});
  // Close the current function or control-flow block.
  }
// Close the current function or control-flow block.
}

// Export an async POST handler that creates a task from the incoming JSON body.
export const createTask = async (req, res) => {
  // Run database operations inside try so errors can be handled by the catch block.
  try {
    // Extract title from req.body, which is populated by express.json() in server.js.
    const {title} = req.body;
    // Create a Task document in memory; schema defaults fill in fields that were omitted.
    const task = new Task({title});
    // Validate and save the new document to MongoDB, then wait for the saved result.
    const newTask = await task.save();
    // Send the saved task as JSON with HTTP status 201 (Created).
    res.status(201).json(newTask);
  // Catch errors thrown in try, including rejected database operations awaited above.
  } catch (error) {
    // Log the handler name and original error in the server terminal for debugging.
    console.log('Lỗi khi gọi createTask', error);
    // Send a general error message with HTTP status 500 (Internal Server Error).
    res.status(500).json({message: 'Lỗi hệ thống'});
  // Close the current function or control-flow block.
  }
// Close the current function or control-flow block.
}

// Export an async PUT handler that updates the task identified by the URL parameter.
export const updateTask = async (req, res) => {
  // Run database operations inside try so errors can be handled by the catch block.
  try {
    // Extract the three task fields supplied in the JSON request body.
    const {title, status, completedAt} = req.body;
    // Find a task by its MongoDB ID and wait for the update operation to finish.
    const updatedTask = await Task.findByIdAndUpdate(
      // Read the id URL parameter registered by the /:id route.
      req.params.id,
      // Start the object containing the fields to update.
      {
        // Use the title variable as the value of the title field (object property shorthand).
        title,
        // Use the status variable as the value of the status field.
        status,
        // Use the completedAt variable as the value of the completion date field.
        completedAt
      // Close the update object before passing the options argument.
      },
      // Return the document after the update; without this option Mongoose returns the previous version.
      {new: true}
    // Close the findByIdAndUpdate call and assign its awaited result to updatedTask.
    )
    // Check for null, which means no document matched the supplied ID.
    if (!updatedTask) {
      // Send HTTP status 404 (Not Found) and return immediately to stop this handler.
      return res.status(404).json({message: 'Nhiệm vụ không tồn tại'})
    // Close the current function or control-flow block.
    }

    // Send the updated task document as JSON with HTTP status 200.
    res.status(200).json(updatedTask);
  // Catch errors thrown in try, including rejected database operations awaited above.
  } catch (error) {
    // Log the handler name and original error in the server terminal for debugging.
    console.log('Lỗi khi gọi updateTask', error);
    // Send a general error message with HTTP status 500 (Internal Server Error).
    res.status(500).json({message: 'Lỗi hệ thống'});
  // Close the current function or control-flow block.
  }
// Close the current function or control-flow block.
}

// Export an async DELETE handler that removes the task identified by the URL parameter.
export const deleteTask = async (req, res) => {
  // Run database operations inside try so errors can be handled by the catch block.
  try {
    // Delete the document matching the URL ID and wait for the deleted document to be returned.
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    // Check whether no document matched the ID, so nothing was deleted.
    if (!deletedTask) {
      // Send HTTP status 404 and return immediately because the task does not exist.
      return res.status(404).json({message: 'Nhiệm vụ không tồn tại'});
    // Close the current function or control-flow block.
    }

    // Send the deleted task document as JSON to confirm which task was removed.
    res.status(200).json(deletedTask);

  // Catch errors thrown in try, including rejected database operations awaited above.
  } catch (error) {
    // Log the handler name and original error in the server terminal for debugging.
    console.log('Lỗi khi gọi deleteTask', error);
    // Send a general error message with HTTP status 500 (Internal Server Error).
    res.status(500).json({message: 'Lỗi hệ thống'});
  // Close the current function or control-flow block.
  }
// Close the current function or control-flow block.
}
