const {model, Schema} = require('mongoose');


const postSchema = new Schema({
    body: {
        type: String, 
        required: true
    },
    username: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            body: String,
            username: String,
            createdAt: {
                type: Date,
                default: Date.now
            },

        }
    ],
    likes: [
        {
            username: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }

});



module.exports = model('Post', postSchema);
