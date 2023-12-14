const PORT = 5000;

const express = require('express');
const app = express();
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const http = require('http');
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

const io = require('socket.io')(server);
const handleBinder = require('./socketHandleBinder.js');
io.on('connection', (socket) => {
    const connection = {};
    connection.io = io;
    connection.socket = socket;
    handleBinder.bind(connection);
});