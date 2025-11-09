//CLIENT_SEND_MESSAGE
const sendButton = document.querySelector(".send-button"); 
const chatInput = document.querySelector(".chat-input");
// Auto-scroll to bottom when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    const chatMessagesContainer = document.querySelector(".chat-messages");
    if (chatMessagesContainer) {
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
});

if(sendButton){
    console.log("Found button:", sendButton);
    
    sendButton.addEventListener("click", (e) => {
        e.preventDefault();
        const content = document.querySelector(".chat-input");
        console.log("Input value:", content.value);

        if(content) {
            socket.emit("CLIENT_SEND_MESSAGE", content.value);
            content.value = "";
        }
    });
}

// Gửi tin nhắn khi nhấn Enter
if(chatInput) {
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const content = chatInput.value;
            if(content) {
                socket.emit("CLIENT_SEND_MESSAGE", content);
                chatInput.value = "";
            }
        }
    });
}
//End CLIENT_SEND_MESSAGE

//SEVER_RETURN_MESSAGE
socket.on("SEVER_RETURN_MESSAGE", (data) => {
    const chatMessages = document.querySelector(".chat-messages");
    
    const messageDiv = document.createElement("div");
    
    if (data.user_id === window.currentUserId) {
        messageDiv.className = "message sent";
        messageDiv.innerHTML = `<div class="message-bubble">${data.content}</div>`;
    } else {
        messageDiv.className = "message received";
        const senderName = (data.infoUser && data.infoUser.fullName) ? data.infoUser.fullName : "Người dùng đã xóa";
        messageDiv.innerHTML = `
            <div class="sender-name">${senderName}</div>
            <div class="message-bubble">${data.content}</div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
//End SEVER_RETURN_MESSAGE
