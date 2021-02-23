const gql = require('graphql-tag');

module.exports  = gql`
type Post{
    id: ID!,
    body: String!,
    createdAt: String,
    username: String!,
    avatar: String!
    comments: [Comment]!,
    likes: [Like]!,
    likeCount: Int!,
    commentCount: Int!
}

type Comment{
    id: ID!,
    createdAt: String,
    username: String!,
    body: String!,
}

type Like{
    id: ID!,
    createdAt: String!,
    username: String!
}

type Query{
    getPosts: [Post]
    getPost(postId: ID!): Post
}
type User{
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    avatar: String!
}

input RegisterInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    avatar: String!
}

type Mutation{
    createPost(body: String!): Post,
    deletePost(postId: ID!): String!
    register(registerInput: RegisterInput): User,
    login(username: String!, password: String!): User,
    createComment(postId: ID!, body: String!): Post!,
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
}
`