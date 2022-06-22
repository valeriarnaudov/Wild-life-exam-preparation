const { isUser } = require("../middleware/guards");
const { createPost, updatePost, vote } = require("../services/post");
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

router.get("/edit/:id", isUser(), async (req, res) => {
    const id = req.params.id;
    const post = postViewModel(await getPostById(id));

    if (req.session.user._id != post.author._id) {
        return res.redirect("/login");
    }

    res.render("edit", { title: post.title, post });
});

router.post("/edit/:id", isUser(), async (req, res) => {
    const id = req.params._id;

    const existing = postViewModel(await getPostById(id));

    if (req.session.user._id != existing.author._id) {
        return res.redirect("/login");
    }

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
        await updatePost(id, post);
        res.redirect("/catalog/" + id);
    } catch (error) {
        const errors = mapErrors(error);
        post._id = id;
        res.render("edit", {
            title: "Edit Post",
            post,
            errors,
        });
    }
});

router.get("/delete/:id", isUser, async (req, res) => {
    const id = req.params.id;
    const existing = postViewModel(await getPostById(id));

    if (req.session.user._id != existing.author._id) {
        return res.redirect("/login");
    }

    try {
        await deletePost(id);
        res.redirect("/catalog");
    } catch (error) {
        const errors = mapErrors(error);
        post._id = id;
        res.render("details", {
            title: existing.title,
            errors,
        });
    }
});

router.get("/vote/:id/:type", isUser(), async (req, res) => {
    const id = req.params.id;
    const value = req.params.type == "upvote" ? 1 : -1;

    try {
        await vote(id, req.session.user._id, value);
        res.redirect("/catalog/" + id);
    } catch (error) {
        const errors = mapErrors(error);
        post._id = id;
        res.render("details", {
            title: "Post Details",
            errors,
        });
    }
});

module.exports = router;
