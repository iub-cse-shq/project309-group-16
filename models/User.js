const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    type: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Users', UserSchema);