const User = require("../models/User");
const { compare, hash } = require("bcrypt");

//TODO add all fields required by the exam

async function register(username, password) {
    const existing = await getUserByUsername(username);

    if (existing) {
        throw new Error("User already exists");
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        username,
        hashedPassword,
    });

    await user.save();

    return user;
}

//TODO change identifier
async function login(username, password) {
    const user = await getUserByUsername(username);

    if (!user) {
        throw new Error("User or password incorrect");
    }

    const hashMatch = await compare(password, user.hashedPassword);
    if (!hashMatch) {
        throw new Error("User or password incorrect");
    }

    return user;
}

//TODO identify user by given identify (username or email)
async function getUserByUsername(username) {
    const user = await User.findOne({ username: new RegExp(`^${username}$`, "i") });
    return user;
}

module.exports = {
    login,
    register,
};
