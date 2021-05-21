import React, { useEffect, useContext } from 'react';

import UsersNavbar from '../../components/DrawingPageComponents/UsersNavbar/UsersNavbar.component';
import DrawingPanel from '../../components/DrawingPageComponents/DrawingPanel/DrawingPanel.component';

import * as Styled from './DrawingPage.styles';

import { SocketContext } from '../../context/socket';

const DrawingPage = () => {
    const socket = useContext(SocketContext);

    useEffect(() => {
        // we need to reconnect the socket because it was disconnected due url change.
        const username = localStorage.getItem('username');
        const room = localStorage.getItem('room');
        socket.emit('rejoin', { username, room }, error => {
            if (error) {
                alert(error);
                window.location.href = '/';
            }
        });

        // this data won't be necessary anymore so we can remove it
        localStorage.removeItem('username');
        localStorage.removeItem('room');

        // when admin presses X button next to username
        socket.on('removedByRoomAdmin', () => {
            socket.disconnect();
            alert('Admin has removed you from this room. You will now be redirected to homescreen');
            window.location = '/';
        });

        // when admin leaves the room, all users will be disconnected
        socket.on('disconnectAllUsersInTheRoom', () => {
            socket.disconnect();
            alert('Admin left the room, so all users in the room will be redirected to home screen.');
            window.location = '/';
        });
    }, []);

    return (
        <Styled.DrawingPage>
            <UsersNavbar />
            <DrawingPanel />
        </Styled.DrawingPage>
    )
}

export default DrawingPage;
