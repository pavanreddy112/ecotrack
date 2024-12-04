const userModel = require('../models/userModel');
const JWT = require('jsonwebtoken');
const ChallengeSubmission = require('../models/ChallengeSubmission');
// Register Controller
const submitChallenge = async (req, res) => {
    try {
        const { challenge } = req.query;
        const { username, email } = req.user; // Get username and email from authenticated user
        const points = parseInt(req.body.points, 10);

        // Check if a file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const newSubmission = new ChallengeSubmission({
            username,
            email,
            picture: req.file.path,
            challenge,
            points
        });

        await newSubmission.save();

        res.status(200).json({ message: 'Challenge submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to submit challenge' });
    }
};

const registerCntrl = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // Check for required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }



        // Proceed with user creation
        const user = await userModel.create({
            username,
            email,
            password,
            profile: 'user',
            rewardpoints: 0
        });

        // Respond with success message
        return res.json({
            success: true,
            message: 'User registered successfully'
        });

    } catch (error) {
        console.error(error);
        // Respond with error message
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error
        });
    }
};

// Login Controller
const logincntrl = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both email and password'
            });
        }

        // Find user by email
        const user = await userModel.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if password matches
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect password'
            });
        }

        // Generate token
        const token = user.generateToken();

        // Set token in cookie and redirect to home page
        res.cookie('token', token, { httpOnly: true }); // Secure and other options can be added here
        res.redirect('/user/home'); // Redirect to the home page after login

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Login controller server error',
            error
        });
    }
};

const getUserProfileCntrl = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id)
        user.password = undefined;
        res.status(200).json({
            success: true,
            message: 'User profile fetched successfully',
            user // Send the user data
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error getting user profile',
            error
        });
    }
};
const logoutCntrl = async (req, res) => {
    try {
        // Check if req.user is set
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized User'
            });
        }

        // Clear the token cookie
        res.clearCookie("token");

        // Redirect to the login page
        res.redirect('login');
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error In log out',
            error
        });
    }
}

const updateUserProfileCntrl = async (req, res) => {
    try {

        const user = await userModel.findById(req.user._id)
        const { username, email, profile } = req.body
        if (username) user.username = username;
        if (email) user.email = email;
        if (profile) user.profile = profile;

        await user.save();
        res.status(200).json({
            success: true,
            message: 'User profile updated successfully',
            user // Send the updated user data
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching the user profile',
            error
        });
    }
}
// Make sure to include the JWT library

const aboutusCntrl = async (req, res) => {
    try {
        // User should be set by the isAuth middleware
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        // Render the About Us page with user data
        res.render('aboutus', { user: req.user });
    } catch (error) {
        console.error('Error in aboutusCntrl:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Error fetching the about us page',
            error: error.message
        });
    }
};
const emissionCalculatorCntrl = async (req, res) => {
    try {
        // User should be set by the isAuth middleware
        if (!req.user) {
            return res.redirect('/login'); // Redirect to login if not authenticated
        }

        // Render the Emission Calculator page with user data
        res.render('emission-calculator', {
            user: req.user
        });
    } catch (error) {
        console.error('Error in emissionCalculatorCntrl:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Error fetching the emission calculator page',
            error: error.message
        });
    }
};
const challengectrl = async (req, res) => {
    try {
        const { username, points } = req.user; // Assuming 'points' is part of the user schema

        res.render('challenge', {
            username,
            points,  // Pass points to the view
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to load challenges' });
    }
};
const chatcntrl = async (req, res) => {
    try {
        res.render('help', { user: req.user });
    }
    catch {
        console.error(error);
        res.status(500).json({ error: 'Failed to load chat' });
    }
}
const feedbackctrl = async (req, res) => {
    try {
        res.render('feedback', { user: req.user });
    }
    catch {
        console.error(error);
        res.status(500).json({ error: 'Failed to feedback chat' });
    }
}
const contactCtrl = async (req, res) => {
    try {
        res.render('contact', { user: req.user });
    }
    catch {
        console.error(error);
        res.status(500).json({ error: 'Failed to feedback chat' });
    }
}
const leaderboardCtrl = async (req, res) => {
    try {
        // Fetch users, sort by reward points in descending order
        const users = await userModel.find({}, 'username rewardpoints')
            .sort({ rewardpoints: -1 })
            .exec();

        // Render the leaderboard with the user data
        res.render('leaderboard', { leaderboard: users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}
const donationCtrl = async (req, res) => {
    try {
        res.render('donation', { user: req.user });
    }
    catch {
        console.error(error);
        res.status(500).json({ error: 'Failed to feedback chat' });
    }
}
const getprofilectrl = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        res.render('profile', { user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = { registerCntrl, logincntrl, getUserProfileCntrl, logoutCntrl, updateUserProfileCntrl, getprofilectrl, aboutusCntrl, emissionCalculatorCntrl, challengectrl, chatcntrl, feedbackctrl, contactCtrl, leaderboardCtrl, donationCtrl };
