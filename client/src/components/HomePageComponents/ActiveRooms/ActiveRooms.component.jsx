import React from 'react';

import * as Styled from './ActiveRooms.styles';

const rooms = ['soba1', 'soba2', 'soba3'];

const ActiveRooms = () => {
    return (
        <Styled.ActiveRoomsContainer>
            <Styled.Header>Active rooms:</Styled.Header>
            <div>
                <Styled.ListOfRooms>
                    {rooms.map((idx, item) => <li key={idx}>{item}</li>)}
                </Styled.ListOfRooms>
            </div>
        </Styled.ActiveRoomsContainer>
    )
}

export default ActiveRooms;
