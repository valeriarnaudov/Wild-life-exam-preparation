const { Schema, model } = require("mongoose");

//TODO change user model
//TODO add validation

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    hashedPassword: {
        type: String,
        required: [true, "Password is required"],
    },
});

userSchema.index(
    { username: 1 },
    { unique: true, collation: { locale: "en", strength: "2" } }
);

const User = model('User', userSchema);

module.exports = User;