// models/Course.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: { type: String, required: true },
    courseId: { type: String, required: true, unique: true },
    classNumber: { type: String, required: true },
    description: { type: String }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
