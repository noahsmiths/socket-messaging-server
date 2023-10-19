import { Server } from 'socket.io';

const PORT = 8080;

const io = new Server({
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

interface RoomMessage {
    event: string,
    body: string
}

interface Room {
    room: string
}

io.on('connection', (socket) => {
    socket.on('join', ({ room } : Room) => {
        socket.join(room);
    });

    socket.on('broadcast', ({ room, event, body }: Room & RoomMessage ) => {
        // socket.to(room)... will prevent event from being emitted to sending socket
        io.to(room).emit(event, body);
    });
});

io.listen(PORT);
console.log(`Listening on port :${PORT}`);