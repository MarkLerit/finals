const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
 email: {
    type: String,
    required: true,
    unique: true,
 },
 password: {
    type: String,
    required: true,
 },
 // Add other fields as necessary
});

module.exports = mongoose.model('User', UserSchema);