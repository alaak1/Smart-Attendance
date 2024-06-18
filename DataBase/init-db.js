const mongoose = require('mongoose');
const Course = require('./models/Course');  // Adjust the path if your models folder is elsewhere

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myAttendanceSystem', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    insertDummyData();
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

function insertDummyData() {
    const courses = [
        { name: "Introduction to Computer Science", courseId: "CS101", classNumber: "B4", description: "Basic concepts of computer science" },
        { name: "Data Structures", courseId: "CS201", classNumber: "C3", description: "Introduction to data structures" },
        { name: "Web Development", courseId: "CS301", classNumber: "D2", description: "Full stack web development" }
    ];

    Course.insertMany(courses)
        .then(() => {
            console.log("Data inserted");  // Success
            mongoose.connection.close();
        })
        .catch((err) => {
            console.error("Error inserting data", err);  // Error handling
            mongoose.connection.close();
        });
}
