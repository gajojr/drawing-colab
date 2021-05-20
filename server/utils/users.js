const users = [];
const rooms = [];

const addUser = ({ id, username, room }) => {
    // clean the data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required'
        };
    }

    // check for existing user
    const existingUser = users.find(user => user.room === room && user.username === username);
    if (existingUser) {
        return {
            error: 'Username is in use'
        };
    }

    // store user
    const user = { id, username, room };
    users.push(user);
    return { user };
}

const removeUserByID = id => {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const removeUserByUsername = ({ username, room }) => {
    const index = users.findIndex(user => user.room === room && user.username === username);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = id => {
    const user = users.find(user => user.id === id);
    return user;
}

const getUsersInRoom = room => {
    room = room.trim().toLowerCase();
    return users.filter(user => user.room === room);
}

const addRoom = (room) => {
    if (rooms.indexOf(room) === -1) {
        rooms.push(room);

        return room;
    }
}

const getRooms = () => rooms;

const removeRoom = room => {
    const index = rooms.indexOf(room);
    if (index !== -1) {
        rooms.splice(index, 1);
    }
}

const compareRooms = (rooms, sids) => {
    let roomToFind;
    rooms.forEach(element => {
        if (sids.indexOf(element) === -1) {
            // dodati nesto da izadje iz petlje kad nadje
            roomToFind = element;
        }
    });

    return roomToFind;
}

module.exports = {
    addUser,
    removeUserByID,
    removeUserByUsername,
    getUser,
    getUsersInRoom,
    addRoom,
    getRooms,
    removeRoom,
    compareRooms
}