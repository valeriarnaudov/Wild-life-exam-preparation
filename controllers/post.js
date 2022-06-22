const { isUser } = require("../middleware/guards");
const { createPost } = require("../services/post");
const { mapErrors } = require("../util/mappers");

const router = require("express").Router();

router.get("/create", isUser(), (req, res) => {
    res.render("create", { title: "Create Post" });
});

router.post("/create", isUser(), async (req, res) => {
    const userId = req.session.user._id;
    const post = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
        author: userId,
    };

    try {
        await createPost(post);
        res.redirect("/catalog");
    } catch (error) {
        const errors = mapErrors(error);
        res.render("create", {
            title: "Create Post",
            data: req.body,
            errors,
        });
    }
});

module.exports = router;
