const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const {validateRegisterInput, validateLoginInput} = require('../utils/validators');
const User = require('../models/User');

const generateToken = (user) =>{
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar
    }, process.env.SECRET_KEY, {expiresIn: '1h'});
}

module.exports = {
    Mutation:{
        async login(_, {username, password}){

            const {errors, valid} = validateLoginInput(username, password);

            if(!valid){
                throw new UserInputError('Errors', {errors})
            }

            const user = await User.findOne({username});

            if(!user){
                errors.general = 'User not found';
                throw new UserInputError('User not found', {errors})
            }

            const match = await bcrypt.compare(password, user.password);
            
            if(!match){
                errors.general = 'Bad credentials';
                throw new UserInputError('Bad credentials', {errors})
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(_, {registerInput: {username, password, confirmPassword, email, avatar}}){

            const user = await User.findOne({username});

            if(user){
                throw new UserInputError('Username is taken', {
                    errors:{
                        username: 'this username is taken'
                    }
                })
            }

            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword, avatar);
            
            if(!valid){
                throw new UserInputError('Errors', {errors})
            }

            password = await bcrypt.hash(password, 12);
            const newUser = new User({
                username,
                password,
                email,
                avatar
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}