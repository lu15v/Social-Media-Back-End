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
type User{
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
}

input createPost{
    body: String!,
    username: String!
}

input RegisterInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
}

type Mutation{
    createPost(input: createPost): Post,
    register(registerInput: RegisterInput): User
}
`