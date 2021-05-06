import React from 'react';
import socket from '../../ClientSocket/ClientSocket';

import * as Styled from './Form.styles';

// for reuse in ActiveRooms.component.jsx 
export const formValidation = (username, room) => {
    if (!username || !room) {
        return alert('Room and username must be provided');
    }

    if (username.length < 4 || room.length < 4) {
        return alert('Room and username must be at least 4 characters long');
    }

    if (username.length > 30 || room.length > 30) {
        return alert('Room and username can\'t be longer than 30 characters');
    }
}

const Form = () => {
    const onSubmit = e => {
        e.preventDefault();

        const username = e.target.username.value;
        const room = e.target.room.value;

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
        <Styled.Form onSubmit={onSubmit} >
            <Styled.Legend>Drawing collab</Styled.Legend>
            <Styled.Label htmlFor="username">username:</Styled.Label>
            <Styled.TextInput id="username" type="text" required />
            <Styled.Label htmlFor="room">room:</Styled.Label>
            <Styled.TextInput id="room" type="text" required />

            <Styled.Submit type="submit" value="Join" />
        </Styled.Form>
    )
}

export default Form;
