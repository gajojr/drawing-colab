import React, { useState, useEffect, useContext, useCallback } from 'react';

import * as Styled from './UsersNavbar.styles';

import { SocketContext } from '../../../context/socket';

const UsersNavbar = () => {
    const socket = useContext(SocketContext);
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState('');

    useEffect(() => {
        socket.on('roomData', ({ user, users }) => {
            setUsers(users);
            if (role !== 'admin' && user.role === 'admin') {
                setRole(user.role);
            }
        })
    }, []);

    const removeUser = useCallback((user) => {
        console.log('user removed');
        socket.emit('userRemoved', user);
    }, []);

    return (
        <Styled.Sidebar>
            <Styled.Caption>Users in this room:</Styled.Caption>
            {users.map((user, idx) => {
                console.log(role, user.role);
                return <Styled.UserName key={idx}>{user.username} {user.role !== 'admin' && role === 'admin' && <Styled.StyledClose onClick={() => removeUser(user)} />}</Styled.UserName>;
            })}
        </Styled.Sidebar>
    )
}

export default UsersNavbar;
