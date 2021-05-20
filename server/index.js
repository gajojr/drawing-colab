const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const favicon = require('serve-favicon');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

const { addUser, removeUserByID, removeUserByUsername, getUser, getUsersInRoom, addRoom, getRooms, removeRoom, compareRooms } = require('./utils/users');

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
        console.log(`ulazni log: `, getRooms().indexOf(room));
        if (getRooms().indexOf(room) !== -1) {
            console.log('poslao sam zahtev u postojecu sobu');
            console.log(username, socket.id);
            // socket je preveliki da bi se prenosio
            io.to(room).emit('roomJoinRequest', ({ username, socketId: socket.id }));
        } else {
            console.log('pravi se nova soba');
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

            io.to(user.room).emit('roomData', {
                user,
                room: user.room,
                users: getUsersInRoom(user.room)
            });

            socket.emit('userAccepted');

            callback();
        }
    });

    socket.on('acceptUser', ({ username, socketId }, callback) => {
        console.log('primljen sam u postojecu sobu, id socketa je: ', socketId);
        console.log(username);

        const rooms = Array.from(io.sockets.adapter.rooms).map(([key, value]) => key);
        const sids = Array.from(io.sockets.adapter.sids).map(([key, value]) => key);

        const room = compareRooms(rooms, sids);
        console.log(`trazena soba je ${room}`);

        const { error, user } = addUser({ id: socketId, username, room });

        if (error) {
            return callback(error);
        }

        // EXPLORE THE STRUCTURE OF THE GIVEN RESULT AND FIND IF IT HAS JOIN METHOD

        // const requestorSocket = io.sockets.sockets.get(socketId);
        // requestorSocket.join(user.room);
        // requestorSocket.emit('userAccepted');

        callback();
    });

    socket.on('declineUser', ({ socketId }) => {
        io.sockets.sockets.get(socketId).emit('userDeclined');
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
});

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});