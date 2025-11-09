# Giao Diện Chat - Product Management System

## Mô tả
Giao diện chat đã được tạo với thiết kế hiện đại và responsive, hỗ trợ tương tác giữa 2 user với các tính năng UI cơ bản cho hệ thống chat.

## Tính năng đã triển khai

### 1. Giao diện chính
- **Sidebar chat**: Hiển thị danh sách các user có thể chat
- **Khung chat chính**: Hiển thị tin nhắn và form nhập liệu
- **Header chat**: Thông tin user và nút chuyển đổi user
- **Switch User**: Nút chuyển đổi giữa User 1 và User 2

### 2. Tính năng UI
- ✅ Chuyển đổi giữa các cuộc trò chuyện với user khác nhau
- ✅ Gửi tin nhắn văn bản từ user hiện tại
- ✅ Upload file đính kèm (hình ảnh, tài liệu)
- ✅ Hiển thị preview file
- ✅ Auto-scroll đến tin nhắn mới nhất
- ✅ Responsive design cho mobile
- ✅ Animation và hiệu ứng mượt mà
- ✅ Typing indicator khi user khác đang nhập
- ✅ Chuyển đổi user (User 1 ↔ User 2)

### 3. Thiết kế
- **Màu sắc**: Sử dụng Bootstrap theme với màu xanh chủ đạo
- **Typography**: Font chữ rõ ràng, dễ đọc
- **Layout**: Flexbox layout hiện đại
- **Icons**: Font Awesome icons
- **Animations**: Hiệu ứng hover, pulse cho status, typing animation

## Cấu trúc file

```
views/client/pages/chat/
└── index.pug              # Template chính của chat

public/css/
└── style.css              # CSS cho giao diện chat (thêm vào cuối file)

public/js/
└── script.js              # JavaScript cho tương tác chat

routes/client/
└── chat.route.js          # Route cho chat

controllers/client/
└── chat.controller.js     # Controller xử lý chat
```

## Cách sử dụng

### 1. Truy cập giao diện
- URL: `http://localhost:3000/chat`
- Giao diện sẽ hiển thị ngay lập tức

### 2. Tương tác với chat
- **Chọn cuộc trò chuyện**: Click vào các user trong sidebar
- **Chuyển đổi user**: Click nút exchange-alt để chuyển giữa User 1 và User 2
- **Gửi tin nhắn**: Nhập text và nhấn Enter hoặc click nút gửi
- **Upload file**: Click nút paperclip để chọn file
- **Emoji**: Click nút smile (placeholder)

### 3. Tính năng 2 User
- **User 1 (Bạn)**: User mặc định khi vào trang
- **User 2**: User khác để chat với
- **User 3**: User thứ 3 để demo
- **Switch User**: Có thể chuyển đổi để chat với tư cách User 2

### 4. Responsive
- Trên mobile: Sidebar sẽ chuyển thành header nhỏ
- Layout tự động điều chỉnh theo kích thước màn hình

## Tính năng chưa triển khai (cần thêm logic)

### 1. Backend
- [ ] Lưu trữ tin nhắn vào database
- [ ] Real-time messaging (Socket.io)
- [ ] Authentication cho người dùng
- [ ] Upload file lên server
- [ ] Emoji picker thực sự
- [ ] User management system

### 2. Frontend
- [ ] Read receipts
- [ ] Message search
- [ ] File download
- [ ] Voice messages
- [ ] Video call integration
- [ ] User profile management

### 3. Database
- [ ] Schema cho messages
- [ ] Schema cho conversations
- [ ] Schema cho users
- [ ] Schema cho attachments

## Công nghệ sử dụng

- **Frontend**: Pug templates, Bootstrap 5, Font Awesome
- **Backend**: Express.js, Node.js
- **Styling**: CSS3 với Flexbox và Grid
- **JavaScript**: Vanilla JS (ES6+)

## Tùy chỉnh

### 1. Thay đổi màu sắc
Chỉnh sửa các biến CSS trong `public/css/style.css`:
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --background-color: #f8f9fa;
}
```

### 2. Thêm user mới
Chỉnh sửa trong `public/js/script.js`:
```javascript
const users = {
    user1: {
        name: 'User 1 (Bạn)',
        avatar: 'https://via.placeholder.com/40/007bff/ffffff?text=U1',
        color: '#007bff'
    },
    user4: {
        name: 'User 4',
        avatar: 'https://via.placeholder.com/40/ffc107/ffffff?text=U4',
        color: '#ffc107'
    }
};
```

### 3. Thêm cuộc trò chuyện mới
Chỉnh sửa template trong `views/client/pages/chat/index.pug`:
```pug
.chat-item(data-user="user4")
    .chat-avatar
        img(src="https://via.placeholder.com/40/ffc107/ffffff?text=U4", alt="User 4")
    .chat-info
        .chat-name User 4
        .chat-last-message Tin nhắn cuối cùng
    .chat-time Thời gian
```

### 4. Thay đổi tin nhắn mẫu
Chỉnh sửa trong `public/js/script.js`:
```javascript
const replies = {
    user2: [
        'Tin nhắn mới 1',
        'Tin nhắn mới 2',
        // Thêm tin nhắn mới
    ]
};
```

## Lưu ý

1. **File upload**: Hiện tại chỉ hiển thị preview, chưa upload lên server
2. **Real-time**: Chưa có kết nối real-time, chỉ là simulation
3. **Data persistence**: Tin nhắn sẽ mất khi refresh trang
4. **Authentication**: Chưa có hệ thống đăng nhập
5. **User switching**: Chỉ là demo, chưa có backend support

## Hướng phát triển tiếp theo

1. **Tích hợp Socket.io** cho real-time messaging
2. **Thêm MongoDB** để lưu trữ tin nhắn
3. **Implement authentication** với Passport.js
4. **Thêm file upload** với Multer
5. **Tích hợp emoji picker** thực sự
6. **Thêm voice/video call** với WebRTC
7. **User management system** với roles và permissions
8. **Message encryption** cho bảo mật
