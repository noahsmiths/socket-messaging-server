const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket: any) => {
    console.log('A user connected.');

    socket.on('ping', () => {
        console.log('Received ping from client');
        socket.emit('pong');
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected.');
    });
});

http.listen(3001, () => {
    console.log('Server is running on port 3001');
});