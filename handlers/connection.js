module.exports = {
    handle: function (connection) {
        console.log(`用戶上線：${connection.socket.id}`);
        connection.io.emit('user-connected', { userId: connection.socket.id });
    }
};