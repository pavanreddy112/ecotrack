const express = require('express');
const { registerCntrl, logincntrl, getUserProfileCntrl, logoutCntrl, updateUserProfileCntrl, aboutusCntrl, emissionCalculatorCntrl, challengectrl, submitChallenge, chatcntrl, feedbackctrl, contactCtrl, leaderboardCtrl, donationCtrl, getprofilectrl } = require('../controllers/userctrl');
const isAuth = require('../middleware/authMiddleware');
const singleupload = require('../middleware/multer');
const multer = require('multer');
const router = express.Router();

// GET methods
router.get('/signup', (req, res) => {
    res.render('signup');  // Render the signup template
});
router.get('/login', (req, res) => {
    res.render('login');  // Render the signup template
});

router.get('/home', isAuth, (req, res) => {
    res.render('home', {
        userId: req.user._id,
        username: req.user.username // Pass the username to the view
    });
});
router.get('/aboutus', isAuth, aboutusCntrl);
router.get('/emission-calculator', isAuth, emissionCalculatorCntrl);

router.get('/challenge', isAuth, challengectrl);
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/challenges');  // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage });
// router.post('/submit-challenge', isAuth, upload.single('picture'), (req, res, next) => {
//     console.log("Challenge submission received");
//     next();
// }, submitChallenge);





router.get('/aboutus', isAuth, aboutusCntrl);

router.get('/logout', isAuth, logoutCntrl);
router.get('/feedback', isAuth, feedbackctrl);
router.get('/help', isAuth, chatcntrl);
router.get('/contact', isAuth, contactCtrl);
router.get('/leaderboard', isAuth, leaderboardCtrl);
router.get('/donation', isAuth, donationCtrl);
router.get('/profile', isAuth, getprofilectrl)
// PUT methods
router.put('/profile-update', isAuth, updateUserProfileCntrl);


// POST methods
router.post('/signup', registerCntrl);

router.post('/login', logincntrl);

module.exports = router;
