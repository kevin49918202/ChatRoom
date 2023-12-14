module.exports = {
    handle: function (connection) {
        connection.socket.on('disconnect', () => {
            // 通知所有在線用戶有用戶斷開連接
            if (connection.userName) {
                console.log(`${connection.userName} 離開聊天室`);
                connection.io.emit('user-logout', { userId: connection.socket.id, userName: connection.userName });
            }
            console.log(`用戶離線：${connection.socket.id}`);
        })
    }
};