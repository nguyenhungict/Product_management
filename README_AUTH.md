# Hệ thống Authentication - Product Management

## 🚀 Tính năng đã hoàn thành

### ✅ Authentication System
- **Đăng ký tài khoản** với validation đầy đủ
- **Đăng nhập/Đăng xuất** với session management
- **Middleware bảo mật** cho các route cần đăng nhập
- **Hash password** tự động với bcrypt
- **Flash messages** cho thông báo lỗi/thành công

### ✅ User Management
- **Model User** với đầy đủ thông tin: fullName, email, avatar, role, status
- **Phân quyền** user/admin
- **Session storage** với MongoDB
- **Thông tin user** có sẵn trong mọi request (`req.user`)

### ✅ Chat Integration
- **Chat controller** đã được cập nhật để sử dụng thông tin user
- **Socket.io** integration với user info
- **Real-time messaging** với user identification

## 📁 Cấu trúc Files

```
models/
├── user.model.js          # Model User với authentication
├── chat.model.js          # Model Chat (đã cập nhật)
└── product.model.js       # Model Product (có sẵn)

controllers/client/
├── auth.controller.js     # Login/Register/Logout
└── chat.controller.js     # Chat với user info

middlewares/
└── auth.middleware.js     # Authentication middleware

routes/client/
├── auth.route.js          # Auth routes
└── chat.route.js          # Chat routes (cần đăng nhập)

views/client/pages/auth/
├── login.pug              # Trang đăng nhập
└── register.pug           # Trang đăng ký

scripts/
└── createAdmin.js         # Script tạo admin
```

## 🛠️ Cài đặt và Chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Tạo file .env
```env
MONGODB_URI=mongodb://localhost:27017/product-management
PORT=3000
SESSION_SECRET=your-super-secret-session-key
```

### 3. Tạo admin user
```bash
npm run create-admin
```

### 4. Chạy ứng dụng
```bash
npm start
```

## 🔐 Sử dụng Authentication

### Thông tin User trong Session
```javascript
// Trong controller
req.user = {
    id: "user_id",
    fullName: "Tên người dùng",
    email: "email@example.com",
    avatar: "avatar_url",
    role: "user" // hoặc "admin"
}

// Trong view (Pug)
if user
    p= user.fullName
    p= user.email
```

### Middleware Authentication
```javascript
const { requireAuth, requireAdmin } = require('./middlewares/auth.middleware');

// Yêu cầu đăng nhập
router.use(requireAuth);

// Yêu cầu quyền admin
router.use(requireAdmin);
```

### Routes có sẵn
- `GET /auth/login` - Trang đăng nhập
- `POST /auth/login` - Xử lý đăng nhập
- `GET /auth/register` - Trang đăng ký
- `POST /auth/register` - Xử lý đăng ký
- `GET /auth/logout` - Đăng xuất
- `GET /chat` - Chat (cần đăng nhập)
- `POST /chat/send-message` - Gửi tin nhắn

## 🗄️ Collections MongoDB

1. **`users`** - Thông tin người dùng
2. **`products`** - Sản phẩm
3. **`chats`** - Tin nhắn chat
4. **`sessions`** - Session store (tự động)

## 👤 Admin Account
- **Email:** admin@example.com
- **Password:** admin123
- **Role:** admin

## 🎯 Chat Features

### Thông tin User trong Chat
- Hiển thị tên người gửi
- Phân biệt tin nhắn gửi/nhận
- Avatar user (nếu có)
- Thời gian gửi tin nhắn

### Socket.io Events
- `SERVER_SEND_MESSAGE` - Nhận tin nhắn mới
- Real-time messaging với user identification

## 🔧 Customization

### Thêm trường mới cho User
```javascript
// models/user.model.js
const userSchema = new mongoose.Schema({
    // ... existing fields
    phone: String,
    address: String
});
```

### Thêm validation
```javascript
// controllers/client/auth.controller.js
// Thêm validation trong registerPost
```

### Custom middleware
```javascript
// middlewares/auth.middleware.js
// Thêm middleware mới
```

## 🚨 Lưu ý Bảo mật

1. **Đổi SESSION_SECRET** trong production
2. **Sử dụng HTTPS** trong production
3. **Validate input** đầy đủ
4. **Rate limiting** cho login attempts
5. **CSRF protection** (có thể thêm sau)

## 📝 TODO (Tùy chọn)

- [ ] Forgot password
- [ ] Email verification
- [ ] Profile management
- [ ] Avatar upload
- [ ] Two-factor authentication
- [ ] Rate limiting
- [ ] CSRF protection

---

**Hệ thống authentication đã sẵn sàng sử dụng!** 🎉



