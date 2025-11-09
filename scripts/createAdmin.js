const mongoose = require('mongoose');
const User = require('../models/user.model');
require('dotenv').config();

const createAdmin = async () => {
    try {
        // Kết nối database
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/product-management');
        console.log('Đã kết nối database');

        // Kiểm tra admin đã tồn tại chưa
        const existingAdmin = await User.findOne({ email: 'admin@example.com' });
        if (existingAdmin) {
            console.log('Admin đã tồn tại');
            return;
        }

        // Tạo admin user
        const admin = new User({
            fullName: 'Administrator',
            email: 'admin@example.com',
            password: 'admin123',
            role: 'admin',
            status: 'active'
        });

        await admin.save();
        console.log('Đã tạo admin user thành công!');
        console.log('Email: admin@example.com');
        console.log('Password: admin123');

    } catch (error) {
        console.error('Lỗi tạo admin:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Đã ngắt kết nối database');
    }
};

createAdmin();



