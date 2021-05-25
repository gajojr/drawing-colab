import React, { useState, useEffect, useCallback, useContext } from 'react';

import * as Styled from './ActiveRooms.styles';

import { formValidation } from '../Form/Form.component';
import { SocketContext } from '../../../context/socket.js';

const ActiveRooms = () => {
    const [activeRooms, setActiveRooms] = useState([]);
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on('showActiveRooms', data => {
            setActiveRooms(data);
        });
    }, []);

    const joinUser = useCallback(room => {
        const username = document.getElementById('username').value;

        if (!formValidation(username, room)) {
            return;
        }

        // show loading animation
        document.getElementById('form').style.display = 'none';
        document.getElementById('header').style.display = 'none';
        document.getElementById('active_rooms_list').style.display = 'none';
        document.getElementById('loading').style.display = 'flex';

        socket.emit('join', { username, room }, error => {
            if (error) {
                alert(error);
                window.location.href = '/';
            }
        });

        socket.on('userAccepted', () => {
            // because socket disconnects, we have to save this info and reconnect it on /drawing-page
            localStorage.setItem('username', username);
            localStorage.setItem('room', room);
            window.location.href = '/drawing-page';
        });

        socket.on('userDeclined', () => {
            alert('You\'ve been declined');
            // reload page elements and remove animation this way
            window.location.reload();
        });
    }, []);

    return (
        <Styled.ActiveRoomsContainer >
            <Styled.Header id='header'>{activeRooms.length ? `Active rooms:` : null}</Styled.Header>
            <Styled.ListOfRooms id='active_rooms_list' style={{ overflowY: activeRooms.length < 4 ? 'hidden' : 'scroll' }}>
                {activeRooms.map((item, idx) => (
                    <Styled.ListItem key={idx}>
                        <Styled.RoomName>
                            {/* truncate the text if it's too long */}
                            {window.innerWidth > 395 ? (item.length > 11 ? item.slice(0, 10) + '...' : item) : (item.length > 20 ? item.slice(0, 20) + '...' : item)}
                        </Styled.RoomName>
                        <Styled.JoinBtn onClick={() => joinUser(item)}>Join</Styled.JoinBtn>
                    </Styled.ListItem>)
                )}
            </Styled.ListOfRooms>
            <Styled.Loading id='loading' style={{ display: 'none' }}>
                <Styled.LoadingText>Waiting for room admin to accept the request</Styled.LoadingText>
                <Styled.LoadAnimation>
                    {/* diplay only when user is waiting to join the room */}
                </Styled.LoadAnimation>
            </Styled.Loading>
        </Styled.ActiveRoomsContainer>
    )
}

export default ActiveRooms;
