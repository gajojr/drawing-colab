const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const favicon = require('serve-favicon');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const redis = require('redis');
const client = redis.createClient();
const { parse, stringify } = require('flatted');

const { addUser, removeUserByID, removeUserByUsername, getUser, getUsersInRoom, addRoom, getRooms, removeRoom } = require('./utils/users');

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

client.on("error", function(error) {
    console.error(error);
});

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
            // kesirati socket od ovog sto trazi da se pridruzi grupi
            client.set('requestorRoom', room, redis.print);
            client.set('requestorSocket', stringify(socket), redis.print);
            client.get('requestorRoom', redis.print);
            client.get('requestorSocket', redis.print);
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

    socket.on('acceptUser', ({ username, socketId }) => {
        console.log('primljen sam u postojecu sobu, id socketa je: ', socketId);
        console.log(username);
        client.get('requestorRoom', (err, reply) => {
            console.log('usao sam u log redisa');
            console.log(reply.toString());
        });

        // za room vraca true
        const { error, user } = addUser({ id: socketId, username, room: client.get('requestorRoom', redis.print) });

        if (error) {
            return callback(error);
        }


        // koristi redis cache 
        const requestorSocket = parse(client.get('requestorSocket', redis.print));
        requestorSocket.join(user.room);

        // io.sockets.connected[socketId].emit();
        // koristi redis cache 
        requestorSocket.emit('userAccepted');

        callback();
    });

    socket.on('declineUser', ({ socketId }) => {
        console.log('odbijen sam u postojecoj sobi');
        // koristi redis cache 
        // io.sockets.connected[socketId].emit();
        const requestorSocket = parse(client.get('requestorSocket', redis.print))
        requestorSocket.emit('userDeclined');
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