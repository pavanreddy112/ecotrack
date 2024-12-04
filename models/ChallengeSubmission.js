const mongoose = require('mongoose');

const challengeSubmissionSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    picture: { type: String, required: true },
    challenge: { type: String, required: true },
    points: { type: Number, required: true },
    approved: { type: Boolean, default: false },
    submissionDate: { type: Date, default: Date.now }
});

const ChallengeSubmission = mongoose.model('ChallengeSubmission', challengeSubmissionSchema);

module.exports = ChallengeSubmission;
