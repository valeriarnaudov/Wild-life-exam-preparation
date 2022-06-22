const Post = require("../models/Post");

async function createPost(post) {
    const newPost = new Post(post);
    await newPost.save();
    return newPost;
}

async function getPosts() {
    return Post.find({});
}

async function getPostById(id) {
    return Post.findById(id);
}

module.exports = {
    createPost,
    getPosts,
    getPostById,
};
