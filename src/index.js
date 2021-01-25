const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
// const {resolvers} = require('./resolvers');
// const {typeDefs} = require('./queries');

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



server.listen({port: __PORT__})
      .then(res => {
          console.log(`Server running ${res.url}`)
      });
