const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");
const chatRoutes = require("./chat.route");
const authRoutes = require("./auth.route");

module.exports = (app) => {
    app.use('/', homeRoutes);
    app.use('/products', productRoutes);
    app.use('/chat', chatRoutes);
    app.use('/auth', authRoutes);
}
