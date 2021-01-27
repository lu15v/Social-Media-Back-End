const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./typesDefs');
const resolvers = require('./resolvers/resolvers');
const {MONGODB} =require('../config');
const User = require('./models/User');

const __PORT__ = 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose
.connect(MONGODB, {useNewUrlParser: true})
.then(() =>{
    return server.listen({port: __PORT__});
})
.then(res => {
        console.log(`Server running ${res.url}`)
});
