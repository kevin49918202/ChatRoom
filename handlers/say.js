module.exports = {
    handle: function (connection) {
        connection.socket.on('say', (data) => {
            console.log(`${connection.userName} : ${data.message}`);
            connection.io.emit('user-say', { userId: connection.socket.id, userName: connection.userName, message: data.message });
        })
    }
};