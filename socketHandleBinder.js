const fs = require('fs');
const handlers = [];
const handlerFiles = fs.readdirSync('./handlers').filter(file => file.endsWith('.js'));
handlerFiles.forEach(file => {
    const handler = require(`./handlers/${file}`);
    if (typeof handler.handle === 'function') {
        handlers.push(handler);
    }
    else {
        console.warn(`警告: ${file} 沒有handle函式 已忽略`);
    }
});

const bind = (connection) => {
    handlers.forEach(handler => {
        handler.handle(connection);
    })
}

module.exports = { bind };