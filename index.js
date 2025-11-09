const express = require('express')
require('dotenv').config();

const database = require('./config/database');
const systemConfig = require('./config/system');
const http = require('http');
const { Server } = require('socket.io');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routeAdmin = require('./routes/admin/index.route');
const route = require('./routes/client/index.route');
const { addUserToLocals } = require('./middlewares/auth.middleware');

database.connect();

const app = express();
const port = process.env.PORT;

//Socket io
const server = http.createServer(app);
const io = new Server(server);
global._io = io;
//End Socket io

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/product-management'
    }),
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Flash messages
app.use(flash());

// Middleware để thêm user vào locals
app.use(addUserToLocals);

//App locals variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//route
routeAdmin(app);
route(app);

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


