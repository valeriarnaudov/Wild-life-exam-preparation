const { Schema, model } = require("mongoose");

//TODO add validation

const NAME_PATTERN = /^[a-zA-Z-]+$/;
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [3, "First name must be at least 3 characters"],
        validate: {
            validator: function (v) {
                return NAME_PATTERN.test(v);
            },
            message: "First name must be letters only",
        },
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [5, "Last name must be at least 3 characters"],
        validate: {
            validator: function (v) {
                return NAME_PATTERN.test(v);
            },
            message: "Last name must be letters only",
        },
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: function (v) {
                return EMAIL_PATTERN.test(v);
            },
            message: "Email is invalid",
        },
    },
    hashedPassword: {
        type: String,
        required: [true, "Password is required"],
    },
});

userSchema.index(
    { email: 1 },
    { unique: true, collation: { locale: "en", strength: "2" } }
);

const User = model("User", userSchema);

module.exports = User;
