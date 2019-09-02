const mongoose = require('mongoose');
const isEmail =  require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 3
    }, email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [isEmail , 'Please fill a valid email address'],
    }, password: {
        type: String,
        require: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
