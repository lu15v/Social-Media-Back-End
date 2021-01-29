const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const {validateRegisterInput} = require('../utils/validators');
const User = require('../models/User');
const {SECRET_KEY} = require('../../config');

module.exports = {
    Mutation:{
        async register(_, {registerInput: {username, password, confirmPassword, email}}){

            const user = await User.findOne({username});

            if(user){
                throw new UserInputError('Username is taken', {
                    errors:{
                        username: 'this username is taken'
                    }
                })
            }
            
            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword);
            
            if(!valid){
                throw new UserInputError('Errors', {errors})
            }

            password = await bcrypt.hash(password, 12);
            const newUser = new User({
                username,
                password,
                email
            });

            const res = await newUser.save();

            const token = await jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, SECRET_KEY, {expiresIn: '1h'});
            
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}