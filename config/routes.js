const homeController = require('../controllers/home')
const authController = require('../controllers/auth')

module.exports = (app) => {
    app.use(homeController)
    app.use(authController)
}