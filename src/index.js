const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const {MONGODB} =require('../config');


const __PORT__ = 5000;

const typeDefs = gql`
    type Query{
        sayHi: String!
    }
`
const resolvers = {
    Query:{
        sayHi:  () => 'Hello World'
    }
}

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
