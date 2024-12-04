const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userctrl');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/challenges'); // Directory where files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // Unique file name
    }
});
const upload = multer({ storage });

// Route to submit a challenge
router.post('/submit-challenge', upload.single('picture'), userCtrl.submitChallenge);

module.exports = router;
