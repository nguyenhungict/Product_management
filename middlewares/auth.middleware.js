const User = require('../models/user.model');

// Middleware kiểm tra đăng nhập
const requireAuth = async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.redirect('/auth/login');
        }

        // Kiểm tra user còn tồn tại trong database
        const user = await User.findById(req.session.user.id);
        if (!user || user.status === 'inactive') {
            req.session.destroy();
            return res.redirect('/auth/login');
        }

        // Cập nhật thông tin user trong session
        req.session.user = {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            avatar: user.avatar,
            role: user.role
        };

        // Thêm thông tin user vào req để sử dụng trong controller
        req.user = req.session.user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        req.session.destroy();
        res.redirect('/auth/login');
    }
};

// Middleware kiểm tra quyền admin
const requireAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).render('client/pages/errors/403', {
            pageTitle: 'Không có quyền truy cập'
        });
    }
    next();
};

// Middleware kiểm tra đã đăng nhập (redirect nếu đã login)
const redirectIfLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    next();
};

// Middleware thêm thông tin user vào locals để sử dụng trong view
const addUserToLocals = (req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
};

module.exports = {
    requireAuth,
    requireAdmin,
    redirectIfLoggedIn,
    addUserToLocals
};
