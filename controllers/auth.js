const { register, login } = require("../services/user");

const router = require("express").Router();

router.get("/register", (req, res) => {
    res.render("register", { layout: false });
});

//TODO check form action, method, fieldnames
router.post("/register", async (req, res) => {
    try {
        if (req.body.password != req.body.repass) {
            throw new Error("Passwords do not match");
        }
        const user = await register(req.body.username, req.body.password);

        req.session.user = user;
        res.redirect("/"); //TODO check redirect required
    } catch (error) {

        //TODO send error messages
        res.render("/register", {
            layout: false,
            data: { username: req.body.username },
        });
    }
});

router.get("/login", (req, res) => {
    res.render("login", { layout: false });
});

//TODO check form action, method, fieldnames
router.post("/login", async (req, res) => {
    try {
        const user = await login(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect("/"); //TODO check redirect required
    } catch (error) {
        //TODO send error messages

        res.render("/login", {
            layout: false,
            data: { username: req.body.username },
        });
    }
});

module.exports = router;
