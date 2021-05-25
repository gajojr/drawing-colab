import React, { useCallback, useContext } from 'react';

import * as Styled from './Form.styles';

import { SocketContext } from '../../../context/socket.js';

// for reuse in ActiveRooms.component.jsx 
export const formValidation = (username, room) => {
    if (!username || !room) {
        alert('Room and username must be provided');
        return false;
    }

    if (username.length < 4 || room.length < 4) {
        alert('Room and username must be at least 4 characters long');
        return false;
    }

    if (username.length > 30 || room.length > 30) {
        alert('Room and username can\'t be longer than 30 characters');
        return false;
    }

    return true;
}

const Form = () => {
    const socket = useContext(SocketContext);

    const onSubmit = useCallback(e => {
        e.preventDefault();

        const username = e.target.username.value;
        const room = e.target.room.value;

        if (!formValidation(username, room)) {
            return;
        }

        socket.emit('join', { username, room }, error => {
            if (error) {
                alert(error);
                window.location.href = '/';
            }
        });

        socket.on('userAccepted', () => {
            console.log('primljen sam, uraaaa!');
            // because socket disconnects, we have to save this info and reconnect it on /drawing-page
            localStorage.setItem('username', username);
            localStorage.setItem('room', room);
            window.location.href = '/drawing-page';
        });

        socket.on('userDeclined', () => {
            alert('You\'ve been declined');
        });
    }, []);

    return (
        <Styled.Form onSubmit={onSubmit} id='form'>
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
