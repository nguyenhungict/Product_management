const express = require('express');
const router = express.Router();

const authController = require('../../controllers/client/auth.controller');
const { redirectIfLoggedIn } = require('../../middlewares/auth.middleware');

// [GET] /auth/login
router.get('/login', redirectIfLoggedIn, authController.login);

// [POST] /auth/login
router.post('/login', redirectIfLoggedIn, authController.loginPost);

// [GET] /auth/register
router.get('/register', redirectIfLoggedIn, authController.register);

// [POST] /auth/register
router.post('/register', redirectIfLoggedIn, authController.registerPost);

// [GET] /auth/logout
router.get('/logout', authController.logout);

module.exports = router;



