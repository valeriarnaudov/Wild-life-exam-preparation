const {
    Schema,
    model,
    Types: { ObjectId },
} = require("mongoose");

const URL_PATTERN = /^https?:\/\/(.+)/;

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [6, "Title must be at least 6 characters"],
    },
    keyword: {
        type: String,
        required: [true, "Keyword is required"],
        minlength: [6, "Keyword must be at least 6 characters"],
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        maxlength: [15, "Location must be at most 15 characters"],
    },
    date: {
        type: String,
        required: [true, "Date is required"],
        length: [10, "Date must be 10 characters"],
    },
    image: {
        type: String,
        required: [true, "Image is required"],
        validate: {
            validator(v) {
                return URL_PATTERN.test(v);
            },
            message: "Image must start with http:// or https://",
        },
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [8, "Description must be at least 8 characters"],
    },
    author: {
        type: ObjectId,
        ref: "User",
        required: [true, "Author is required"],
    },
    votes: {
        type: [ObjectId],
        ref: "User",
        default: [],
    },
    rating: {
        type: Number,
        default: 0,
    },
});

const Post = model("Post", postSchema);

module.exports = Post;
