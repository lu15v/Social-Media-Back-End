const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    email: String,
    createdAt: {
        type: Date, 
        default: Date.now
    },
    avatar: String
});

module.exports =  model('User', userSchema);