// Import
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const connectDb = require('./config/db');
const path = require('path');
const cookieParser = require('cookie-parser')
const cloudinary = require('cloudinary');
require('dotenv').config();
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const { trackActiveWindows } = require('./tracker');


const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS for rendering HTML
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Route for the homepage
app.get('/user/screentracker', (req, res) => {
    res.render('screentracker');
});

// API endpoint to get app usage data
app.get('/api/app-usage', (req, res) => {
    res.json(appUsage);
});

let appUsage = {}; // Declare appUsage here

// Track and emit screen time data
trackActiveWindows((data) => {
    appUsage = data; // Update appUsage with tracked data
    io.emit('appUsageUpdate', appUsage); // Send data to all clients
});


// Rest objects

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')))
// MongoDB connection
connectDb();


// cloudinary config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
})

// View template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Routes
app.use('/user', userRoutes);  // Attach userRoutes to /user path



// app.get('/login', (req, res) => {
//     res.render("login");
// });
// app.get('/signup', (req, res) => {
//     res.render("signup");
// });

// app.get('/challenge', (req, res) => {
//     res.render("challenge");
// });

app.post('/contact-form', (req, res) => {
    res.json({
        success: true,
        message: 'Hello'
    });
});

// Error handling for undefined routes
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not defined

// Listener
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
