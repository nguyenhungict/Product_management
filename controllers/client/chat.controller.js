const Chat = require('../../models/chat.model');
const User = require('../../models/user.model');

// [GET] /chat
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;


    //Socket io
    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESSAGE", async (content) => {
            //Luu vao database
            const chat = new Chat({
                user_id: userId,
                content: content
            });
            await chat.save();

            // Lấy thông tin user để gửi về client
            const infoUser = await User.findOne({
                _id: userId
            }).select("fullName");

            // Gửi tin nhắn về tất cả client (bao gồm cả người gửi)
            _io.emit("SEVER_RETURN_MESSAGE", {
                user_id: userId,
                content: content,
                infoUser: infoUser || { fullName: "Người dùng đã xóa" }
            });
        })
    });
    //End Socket io

    //Lay data tu database
    const chats = await Chat.find({
        deleted: false
    });

    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id: chat.user_id
        }).select("fullName");

        if (infoUser) {
            chat.infoUser = infoUser;
        } else {
            chat.infoUser = { fullName: "Người dùng đã xóa" };
        }
    }

    res.render("client/pages/chat/index", {
        pageTitle: "Chat",
        chats: chats
    });
};