const Post = require('../models/Post');
const checkAuth = require('../utils/check-auth');
const {UserInputError, AuthenticationError} = require('apollo-server');

module.exports = {

    Mutation:{
        async createComment(_, {postId, body}, context){
            const {username, avatar} = checkAuth(context);

            if(body.trim() === ""){
                throw new UserInputError("Empty comment", {
                    errors:{
                        body: "Comment cannot be empty"
                    }
                });
            }

            const post = await Post.findById(postId);
            
            if(post){
                post.comments.unshift({
                    body,
                    username,
                    avatar
                })
                await post.save();
                return post;
            }else{
                throw new UserInputError("Post not found");
            }

        },
        async deleteComment(_, {postId, commentId}, context){
            const {username} = checkAuth(context);

            const post = await Post.findById(postId);

            if(post){
                const commentIdx = post.comments.findIndex(c => c.id === commentId);
                
                if(post.comments[commentIdx].username === username){
                    post.comments.splice(commentIdx,1);
                    await post.save();
                    return post;
                }else{
                    throw new AuthenticationError('Action not allowed');
                }
             }else{
                 throw new UserInputError('Post not found');
             }
            
        }
    }

}