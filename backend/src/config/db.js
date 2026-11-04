// Import Mongoose, the library used here to connect the application to MongoDB.
import mongoose from 'mongoose';

// Export an async arrow function; async allows await inside it and makes it return a Promise.
export const connectDB = async () => {
    // Try the connection code; a thrown error or rejected awaited Promise moves execution to catch.
    try {
        // Read the URI from the environment and wait for the MongoDB connection to succeed.
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        // Print a success message only after the awaited connection has succeeded.
        console.log('Kết nối CSDL thành công');
    } catch (error) { // Capture a connection error in the variable named error.
        // Print the failure message and error details to the terminal's error output.
        console.error('Lỗi khi kết nối CSDL:', error);
        // Stop the Node.js process with exit code 1, which indicates failure.
        process.exit(1);
    } // Close the catch block.
}; // End the function body and finish assigning the function to connectDB.
