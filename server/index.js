const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const favicon = require('serve-favicon');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

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
    socket.on('showActiveRooms', () => {
        socket.emit('activeRooms', ['soba1', 'soba2', 'soba3', 'soba4', 'soba5'])
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// app.get('/temp', (req, res) => res.json('temporary route'));

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});