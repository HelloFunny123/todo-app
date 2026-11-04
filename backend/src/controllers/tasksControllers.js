// These controllers currently return fixed messages; they do not read or change database records.
// Express supplies req (the incoming request) and res (the outgoing response) to each handler.

// Define and export an arrow function for GET requests; req is unused in this placeholder handler.
export const getAllTasks = (req, res) => {
  // Set HTTP status 200 (OK), then send a JSON object containing the message property.
  res.status(200).json({ message: "Lấy danh sách nhiệm vụ thành công" });
}; // End the function body and finish assigning the function to getAllTasks.

// Define and export the handler intended to create a task when a POST request arrives.
export const createTask = (req, res) => {
  // Send HTTP status 201 (Created) and a JSON message; this placeholder does not save a task yet.
  res.status(201).json({ message: "Nhiệm vụ mới đã được thêm thành công" });
}; // End the function body and finish assigning the function to createTask.

// Define and export the handler intended to update the task identified by req.params.id.
export const updateTask = (req, res) => {
  // Send HTTP status 200 and a JSON message; no task is actually updated at this stage.
  res.status(200).json({ message: "Nhiệm vụ đã được thay đổi thành công" });
}; // End the function body and finish assigning the function to updateTask.

// Define and export the handler intended to delete the task identified by req.params.id.
export const deleteTask = (req, res) => {
  // Send HTTP status 200 and a JSON message; no task is actually deleted at this stage.
  res.status(200).json({ message: "Nhiệm vụ đã được xóa thành công" });
}; // End the function body and finish assigning the function to deleteTask.
