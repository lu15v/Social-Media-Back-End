const Post = require('../models/Post');

module.exports = {
    Query:{
        async getPosts() {
            try{
                const posts = await Post.find();
                return posts;
            }catch(err){
                 throw new Error(err);
            }
        }
     },
     Mutation: {
         async createPost(_, {input}) {
             try{
                 const post = new Post(input);
                 post.save();
                 return post;
             }catch(err){
                 throw new Error(err);
             }
         }
     }
}