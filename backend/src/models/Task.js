// Import Mongoose so this file can define a schema and create a model.
import mongoose from 'mongoose';
// Start a schema describing the fields and options for each task document.
const taskSchema = new mongoose.Schema({
    // Define the title field and its validation options.
    title: {
        // Store the title as a string.
        type: String,
        // Require every saved task to have a nonempty title.
        required: true,
        // Remove leading and trailing whitespace from the title.
        trim: true
    // Close the title field definition.
    },
    // Define the status field and its allowed values.
    status: {
        // Store the status as a string.
        type: String,
        // Allow only active or completed when schema validation runs.
        enum: ["active", "completed"],
        // Use active when a new document does not specify a status.
        default: "active"
    // Close the status field definition.
    },
    // Define the field that records when the task was completed.
    completedAt: {
        // Store the completion time as a Date; valid date strings can be cast to this type.
        type: Date,
        // Use null when a new task has no completion date.
        default: null
    // Close the completedAt field definition.
    }
// Close the fields object and start the schema options object.
}, {
    // Automatically maintain createdAt and updatedAt timestamps.
    timestamps: true,
// Close the schema options object and finish creating the schema.
});
// Create the Task model; Mongoose normally maps this name to the tasks collection.
const Task = mongoose.model('Task', taskSchema);
// Export Task as the default value so controllers can import and use the model.
export default Task;
