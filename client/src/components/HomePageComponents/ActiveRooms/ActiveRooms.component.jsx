import React, { useState, useEffect } from 'react';
import socket from '../../ClientSocket/ClientSocket';

import * as Styled from './ActiveRooms.styles';

import { formValidation } from '../Form/Form.component';

const ActiveRooms = () => {
    const [activeRooms, setActiveRooms] = useState([]);

    useEffect(() => {
        socket.on('showActiveRooms', data => {
            console.log(`sobe: ${data}`);
            setActiveRooms(data);
        });
    }, []);

    const joinUser = room => {
        const username = document.getElementById('username').value;

        formValidation(username, room);

        socket.emit('join', { username, room }, error => {
            if (error) {
                alert(error);
                window.location.href = '/';
            }
        });

        window.location.href = '/drawing-page';
    }

    return (
        <Styled.ActiveRoomsContainer>
            <Styled.Header>{activeRooms.length ? `Active rooms:` : null}</Styled.Header>
            <Styled.ListOfRooms style={{ overflowY: activeRooms.length < 4 ? 'hidden' : 'scroll' }}>
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
        </Styled.ActiveRoomsContainer>
    )
}

export default ActiveRooms;
