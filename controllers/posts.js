const Post = require('../models/post');
const User = require('../models/user');

module.exports = {
    index: async (req, res, next) => {
        // get all the posts
        const posts = await Post.find({});
        res.status(200).json(posts);
    },

    newPost: async (req, res, next) => {
        //console.log(req.value);
        
        //* author here is the acutal author object, not just an id
        // 1. find the actual author via user model
        const author = await User.findById(req.value.body.author);
        
        //* remove the author's id in the req.body
        // 2. create a new post
        // req.body still contains author's id property
        const newPost = req.value.body;
        //* remove the author's id
        delete newPost.author;
        
        // post w/o the author, so now it only has content and date
        const post = new Post(newPost);
        

        //* assign the author object into the actual author
        // because one post only can be written by one person
        // there's no need to push into an array
        post.author = author;
        await post.save();

        // 3. add newley created post to the author
        author.posts.push(post);
        await author.save();

        res.status(201).json(post);
    },

    getPost: async (req, res, next) => {
        const post = await Post.findById(req.value.params.postId);
        res.status(200).json(post);
    },

    replacePost: async (req, res, next) => {
        const {postId} = req.value.params;
        const newPost = req.value.body;

        const result = await Post.findByIdAndUpdate(postId, newPost);
        res.status(200).json({success: true})
    },

    updatePost: async (req, res, next) => {
        const { postId } = req.value.params;
        const newPost = req.value.body;

        const result = await Post.findByIdAndUpdate(postId, newPost, { useFindAndModify: true});
        res.status(200).json({ success: true })
    },

    deletePost: async (req, res, next) => {
        const { postId } = req.value.params;
        // get the post
        const post = await Post.findById(postId);
        
        if(!post) {
            return res.status(404).json({error: 'the post does not exist.'});
        }

        const authorId = post.author;
        // get the author
        const author = await User.findById(authorId);

        // remove the post
        await post.remove();
        // remove the post from the author's list
        author.posts.pull(post);
        await author.save(); 
        res.status(200).json({success: true});
    }
}