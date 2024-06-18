const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courses');  // Make sure the path matches where your routes file is located

const app = express();

// Middleware to handle JSON data and CORS (Cross-Origin Resource Sharing) issues
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const dbUrl = 'mongodb://localhost:27017/myAttendanceSystem';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Using courseRoutes for handling all '/courses' endpoint calls
app.use('/courses', courseRoutes);

const qrRoutes = require('./routes/qrcode');
app.use('/qr', qrRoutes);


// Root route just to check if our server is working
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
