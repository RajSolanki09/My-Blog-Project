const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'], // only allow these values
        default: 'user'
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;