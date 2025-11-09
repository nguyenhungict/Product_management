const User = require('../../models/user.model');

// [GET] /auth/login
module.exports.login = async (req, res) => {
    res.render('client/pages/auth/login', {
        pageTitle: 'Đăng nhập',
        errors: req.flash('errors') || [],
        success: req.flash('success') || []
    });
};

// [POST] /auth/login
module.exports.loginPost = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra email và password
        if (!email || !password) {
            req.flash('errors', 'Vui lòng nhập đầy đủ thông tin');
            return res.redirect('/auth/login');
        }

        // Tìm user theo email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            req.flash('errors', 'Email hoặc mật khẩu không đúng');
            return res.redirect('/auth/login');
        }

        // Kiểm tra trạng thái user
        if (user.status === 'inactive') {
            req.flash('errors', 'Tài khoản đã bị khóa');
            return res.redirect('/auth/login');
        }

        // So sánh password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            req.flash('errors', 'Email hoặc mật khẩu không đúng');
            return res.redirect('/auth/login');
        }

        // Lưu thông tin user vào session
        req.session.user = {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            avatar: user.avatar,
            role: user.role
        };

        req.flash('success', 'Đăng nhập thành công');
        res.redirect('/');
    } catch (error) {
        console.error('Login error:', error);
        req.flash('errors', 'Có lỗi xảy ra, vui lòng thử lại');
        res.redirect('/auth/login');
    }
};

// [GET] /auth/register
module.exports.register = async (req, res) => {
    res.render('client/pages/auth/register', {
        pageTitle: 'Đăng ký',
        errors: req.flash('errors') || [],
        success: req.flash('success') || []
    });
};

// [POST] /auth/register
module.exports.registerPost = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;

        // Kiểm tra thông tin đầu vào
        if (!fullName || !email || !password || !confirmPassword) {
            req.flash('errors', 'Vui lòng nhập đầy đủ thông tin');
            return res.redirect('/auth/register');
        }

        if (password !== confirmPassword) {
            req.flash('errors', 'Mật khẩu xác nhận không khớp');
            return res.redirect('/auth/register');
        }

        if (password.length < 6) {
            req.flash('errors', 'Mật khẩu phải có ít nhất 6 ký tự');
            return res.redirect('/auth/register');
        }

        // Kiểm tra email đã tồn tại
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            req.flash('errors', 'Email đã được sử dụng');
            return res.redirect('/auth/register');
        }

        // Tạo user mới
        const newUser = new User({
            fullName: fullName.trim(),
            email: email.toLowerCase().trim(),
            password: password
        });

        await newUser.save();

        req.flash('success', 'Đăng ký thành công! Vui lòng đăng nhập');
        res.redirect('/auth/login');
    } catch (error) {
        console.error('Register error:', error);
        req.flash('errors', 'Có lỗi xảy ra, vui lòng thử lại');
        res.redirect('/auth/register');
    }
};

// [GET] /auth/logout
module.exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/');
    });
};
