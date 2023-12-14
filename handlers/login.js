module.exports = {
    handle: function (connection) {
        connection.socket.on('login', (data, callback) => {
            console.log(`${data.userName} 加入聊天室`);
            connection.userName = data.userName;
            connection.io.emit('user-login', { userId: connection.socket.id, userName: connection.userName });
            callback();
        })
    }
};