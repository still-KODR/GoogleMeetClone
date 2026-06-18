const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    password: { type: String },
    refreshToken: {type: String},
}, { timestamps: true });

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;