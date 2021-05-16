import React, { useState, useEffect, useContext } from 'react';

import * as Styled from './UsersNavbar.styles';

import { SocketContext } from '../../../context/socket';

const UsersNavbar = () => {
    const socket = useContext(SocketContext);
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState('');

    useEffect(() => {
        socket.on('roomData', ({ user, room, users }) => {
            setUsers(users);
            setRole(user.role);
        })
    }, [socket]);

    return (
        <Styled.Sidebar>
            <Styled.Caption>Users in this room:</Styled.Caption>
            {users.map((user, idx) => {
                console.log(role, user.role);
                return <Styled.UserName key={idx}>{user.username} {user.role !== 'admin' && role === 'admin' && <Styled.StyledClose onClick={() => console.log('user removed')} />}</Styled.UserName>;
            })}
        </Styled.Sidebar>
    )
}

export default UsersNavbar;
