const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const favicon = require('serve-favicon');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

const { addUser, removeUserByID, removeUserByUsername, getUserById, getUserByUsername, getUsersInRoom, addRoom, getRooms, removeRoom } = require('./utils/users');

const PORT = process.env.PORT || 8080;

// const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, '../client/public/favicon.ico')));
app.use(compression());
app.use(helmet());
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// app.use('/', indexRouter);

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
    socket.emit('showActiveRooms', getRooms());

    socket.on('join', ({ username, room }, callback) => {
        if (getRooms().indexOf(room) !== -1) {
            const usersInRoom = getUsersInRoom(room);
            if (usersInRoom.some(user => user.username === username)) {
                return callback('Username is in use');
            }
            io.to(room).emit('roomJoinRequest', ({ username, socketId: socket.id }));
        } else {
            const { error, user } = addUser({ id: socket.id, username, room });

            if (error) {
                return callback(error);
            }

            socket.join(user.room);
            // check if this room is new
            const answer = addRoom(user.room);
            // if it's new add it to the list of active rooms
            if (answer === user.room) {
                io.emit('showActiveRooms', getRooms());
                user.role = 'admin';
            }

            socket.emit('userAccepted');

            callback();
        }
    });

    // same logic as when creating the new room without emitting('userAccepted')
    socket.on('rejoin', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room });

        if (error) {
            return callback(error);
        }

        socket.join(room);
        // check if this room is new
        const answer = addRoom(room);
        // if it's new add it to the list of active rooms
        if (answer === room) {
            io.emit('showActiveRooms', getRooms());
            user.role = 'admin';
        }

        io.to(room).emit('roomData', {
            user,
            room,
            users: getUsersInRoom(room)
        });

        callback();
    });

    socket.on('acceptUser', ({ socketId }, callback) => {
        try {
            // TypeError: Cannot read property 'join' of undefined
            const requestorSocket = io.sockets.sockets.get(socketId);
            requestorSocket.emit('userAccepted');
        } catch (err) {
            console.log(err);
        }

        callback();
    });

    socket.on('declineUser', ({ socketId }) => {
        try {
            io.sockets.sockets.get(socketId).emit('userDeclined');
        } catch (err) {
            console.log(err);
        }
    });

    socket.on('userRemoved', userToRemove => {
        const user = removeUserByUsername({ username: userToRemove.username, room: userToRemove.room });

        io.to(user.room).emit('roomData', {
            user,
            room: user.room,
            users: getUsersInRoom(user.room)
        });

        io.to(user.id).emit('removedByRoomAdmin');
    });

    socket.on('disconnect', reason => {
        console.log(`reason: ${reason}`);
        const user = removeUserByID(socket.id);

        if (user) {
            if (user.role === 'admin') {
                io.to(user.room).emit('disconnectAllUsersInTheRoom');
            }

            io.to(user.room).emit('roomData', {
                user,
                room: user.room,
                users: getUsersInRoom(user.room)
            });

            if (!io.sockets.adapter.rooms.get(user.room)) {
                removeRoom(user.room);
                io.emit('showActiveRooms', getRooms());
            }
        }
    });

    socket.on('canvas-data', data => {
        const user = getUserById(socket.id);
        io.to(user.room).emit('canvas-data', data);
    });

    socket.on('clear-canvas', () => {
        console.log('usao')
        const user = getUserById(socket.id);
        io.to(user.room).emit('clear-canvas');
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});