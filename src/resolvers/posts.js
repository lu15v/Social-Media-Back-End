const Post = require('../models/Post');
const checkAuth = require('../utils/check-auth');
const {AuthenticationError, UserInputError} = require('apollo-server');

module.exports = {
    Query:{
        async getPosts() {
            try{
                const posts = await Post.find().sort({createdAt: -1});
                return posts;
            }catch(err){
                 throw new Error(err);
            }
        },

        async getPost(_, {postId}) {
            try{
                const post = await Post.findById(postId);

                if(post){
                    return post
                }

                throw new Error("Post not found");
            }catch(err){
                throw new Error(err);
            }
        }
     },
     Mutation: {
         async createPost(_, {body}, context) {
             const user = checkAuth(context);
             try{
                 const post = new Post({
                     body,
                     user: user.id,
                     username: user.username
                 });

                 await post.save();
                 return post;
             }catch(err){
                 throw new Error(err);
             }
         },
         async deletePost(_, {postId}, context){
             const user = checkAuth(context);

             try{
                 const post = await Post.findById(postId);
                 if(post){
                     if(user.username !== post.username){
                         throw new AuthenticationError("Action not allowed");
                     }
                     
                     post.delete();
                     return "Post deleted successfully";
                 }
                 throw new Error("Post not found");

             }catch(err){
                 throw new Error(err);
             }
         },
         async likePost(_, {postId}, context){
            const {username} = checkAuth(context);

            try{
                const post = await Post.findById(postId);
                
                if(post){

                    if(post.likes.find(like => like.username === username)){
                        //Post already liked, unliked.
                        post.likes = post.likes.filter(like => like.username !== username);
                    }else{
                        post.likes.push({
                            username
                        })
                    }
                    await post.save();
                    return post;
                }
                throw new UserInputError("Post not found");
            }catch(err){
                throw new Error(err);
            }
         }
     }
}