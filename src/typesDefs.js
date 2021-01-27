const gql = require('graphql-tag');

module.exports  = gql`
type Post{
    id: ID!,
    body: String!,
    createdAt: String,
    username: String!
}
type Query{
    getPosts: [Post]
}

input createPost{
    body: String!,
    username: String!
}

type Mutation{
    createPost(input: createPost): Post
}
`