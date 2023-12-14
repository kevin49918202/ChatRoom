let socket = null;
let userName = null;
let inChatRoom = false;
const ip = '';

function connectToServer() {
    socket = io(ip);
    socket.on('connect', () => {
        console.log(`連線成功 socketId:${socket.id}`);
        login();
    });
    
    socket.on('user-say', (data) => {
        pushMessage(`${data.userName}：${data.message}`);
    });

    socket.on('user-login', (data) => {
        pushMessage(`${data.userName} 加入聊天室`);
    });
    
    socket.on('user-logout', (data) => {
        pushMessage(`${data.userName} 離開聊天室`);
    })
    
    socket.on('connect_error', (error) => {
        console.error('連接失敗:', error.message);
        // 在這裡處理連接失敗的情況
        // 例如，可以顯示一個錯誤提示給使用者
    });

    socket.on('disconnect', () => {
        socket.close();
        socket = null;
        userName = null;
        console.error('與伺服器失去連線');
    })
}

function login() {
    const nameInput = document.getElementById('nameInput');
    socket.emit('login', { userName: nameInput.value }, () => {
        userName = nameInput.value;
        console.log(`登入成功 用戶名稱：${nameInput.value}`);
        enterChatRoom();
    });
}

function enterChatRoom() {
    clearMessage();
    document.getElementById('login').style.display = 'none';
    document.getElementById('chatRoom').style.display = 'block';
    inChatRoom = true;
}

function leaveChatRoom() {
    document.getElementById('login').style.display = 'block';
    document.getElementById('chatRoom').style.display = 'none';
    inChatRoom = false;
}

function pushMessage(text) {
    if (inChatRoom == false) return;
    const messageView = document.getElementById('messageView');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = text;
    messageView.appendChild(messageDiv);
    // 滾動視圖至底部
    messageView.scrollTop = messageView.scrollHeight;
}

function clearMessage() {
    const chatDiv = document.getElementById('messageView');
    chatDiv.innerHTML = ''; // 清除所有子元素
}

function sendMessage() {
    if (socket && socket.connected) {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value;
        console.log(`發送訊息：${message}`);
        socket.emit('say', { message });
        messageInput.value = '';
    }
}