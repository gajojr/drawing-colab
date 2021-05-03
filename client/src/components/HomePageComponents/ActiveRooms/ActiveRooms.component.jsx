import React from 'react';

import * as Styled from './ActiveRooms.styles';

const rooms = ['soba1', 'soba2', 'soba1soba111soba111111', 'soba4', 'soba5'];

const ActiveRooms = () => {
    return (
        <Styled.ActiveRoomsContainer>
            <Styled.Header>Active rooms:</Styled.Header>
            <Styled.ListOfRooms style={{ overflowY: rooms.length < 4 ? 'hidden' : 'scroll' }}>
                {rooms.map((item, idx) => (
                    <Styled.ListItem key={idx}>
                        <Styled.RoomName>{window.innerWidth > 395 ? (item.length > 11 ? item.slice(0, 10) + '...' : item) : (item.length > 20 ? item.slice(0, 20) + '...' : item)}</Styled.RoomName>
                        <Styled.JoinBtn>Join</Styled.JoinBtn>
                    </Styled.ListItem>)
                )}
            </Styled.ListOfRooms>
        </Styled.ActiveRoomsContainer>
    )
}

export default ActiveRooms;
