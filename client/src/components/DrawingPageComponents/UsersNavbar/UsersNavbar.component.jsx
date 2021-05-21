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
        socket.on('roomJoinRequest', ({ socketId }) => {
            // sometimes socketId isn't provided
            console.log(socketId)
            if (role === 'admin' && socketId) {
                console.log(socketId)
                document.getElementById('joinRequestDialog').style.display = 'flex';

                document.getElementById('acceptUser').addEventListener('click', () => {
                    document.getElementById('joinRequestDialog').style.display = 'none';
                    socket.emit('acceptUser', { socketId }, error => {
                        if (error) {
                            alert(error);
                            window.location.href = '/';
                        }
                    });
                });

                document.getElementById('declineUser').addEventListener('click', () => {
                    document.getElementById('joinRequestDialog').style.display = 'none';
                    socket.emit('declineUser', { socketId }, error => {
                        if (error) {
                            alert(error);
                            window.location.href = '/';
                        }
                    });
                });
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

            <Styled.JoinRequest id='joinRequestDialog' style={{ display: 'none' }}>
                <Styled.Message>
                    New user wants to join, accept?
                </Styled.Message>
                <Styled.AcceptIcon id='acceptUser' />
                <Styled.DeclineIcon id='declineUser' />
            </Styled.JoinRequest>
        </Styled.Sidebar>
    )
}

export default UsersNavbar;
