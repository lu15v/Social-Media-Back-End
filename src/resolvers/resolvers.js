const postResolvers = require('./posts');
const userResolvers = require('./users');
const commentResolvers = require('./comments');

module.exports = {
    Query:{
        ...postResolvers.Query
    },
    Mutation:{
        ...postResolvers.Mutation,
        ...userResolvers.Mutation,
        ...commentResolvers.Mutation
    }
}
