const jwt = require('jsonwebtoken');
const {AuthenticationError} = require('apollo-server');


module.exports = (context) => {
    const authHeader = context.req.headers.authorization;

    if(authHeader){
        //Bearer.. convention used
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try{
                const user = jwt.verify(token, process.env.SECRET_KEY);
                return user;
            }catch{
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error('token invalid or wrong format, it must be beared');
    }
    throw new Error('Auth header must be provided');
}