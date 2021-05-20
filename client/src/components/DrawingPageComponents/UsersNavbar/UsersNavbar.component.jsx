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
        });
    }, []);

    useEffect(() => {
        socket.on('roomJoinRequest', ({ username, socketId }) => {
            console.log(`dobio sam zahtev od korisnika: ${username}`);
            console.log(`role: ${role}`);
            if (role === 'admin') {
                console.log('uloga je admin');
                if (window.confirm(`${username} sent the request to join, accept?`)) {
                    console.log('prihvacen');
                    socket.emit('acceptUser', { username, socketId }, error => {
                        if (error) {
                            alert(error);
                            window.location.href = '/';
                        }
                    });
                } else {
                    console.log('odbiven');
                    socket.emit('declineUser', { socketId }, error => {
                        if (error) {
                            alert(error);
                            window.location.href = '/';
                        }
                    });
                }
            }
        });
    }, [role]);


    const removeUser = useCallback((user) => {
        socket.emit('userRemoved', user);
    }, []);

    return (
        <Styled.Sidebar>
            <Styled.UsersInfo>
                <Styled.Caption>Users in this room:</Styled.Caption>
                {users.map((user, idx) => {
                    return <Styled.UserName key={idx}>{user.username} {user.role && `(${user.role})`} {user.role !== 'admin' && role === 'admin' && <Styled.StyledClose onClick={() => removeUser(user)} />}</Styled.UserName>;
                })}
            </Styled.UsersInfo>
            <Styled.LeaveButton onClick={() => {
                if (window.confirm('Are you sure you want to leave this room?')) {
                    socket.disconnect()
                    window.location = '/';
                }
            }}>Leave</Styled.LeaveButton>
        </Styled.Sidebar>
    )
}

export default UsersNavbar;
