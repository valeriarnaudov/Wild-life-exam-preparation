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
    return Post.findById(id).populate("author", "firstName lastName").populate('votes', 'email');
}

async function updatePost(id, post) {
    const existing = await Post.findById(id);
    existing.title = post.title;
    existing.keyword = post.keyword;
    existing.location = post.location;
    existing.date = post.date;
    existing.image = post.image;
    existing.description = post.description;

    await existing.save();
}

async function deletePost(id) {
    return Post.findByIdAndDelete(id);
}

async function vote(postId, userId, value) {
    const post = await Post.findById(postId);

    if (post.votes.includes(userId)) {
        throw new Error("You have already voted for this post");
    }

    post.votes.push(userId);
    post.rating += value;

    await post.save();
}

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    vote,
};
