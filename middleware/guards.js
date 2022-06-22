function isUser () {
    return function (req, res, next) {
        if (req.session.user) {
            next();
        } else {
            res.redirect("/login");
        }
    }
}

function isGuest () {
    return function (req, res, next) {
        if (req.session.user) {
            res.redirect("/login");
        } else {
            next();
        }
    }
}

module.exports = {
    isUser,
    isGuest,
}