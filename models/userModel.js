const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    profile: {
        type: String,
        default: 'user'
    },
    rewardpoints: {
        type: Number,
        default: 0
    }
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
}; userSchema.methods.generateToken = function () {
    return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "14d"
    });
};



// Use module.exports instead of export
module.exports = mongoose.model("Users", userSchema);
