import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import Form from '../../components/HomePageComponents/Form/Form.component';
import ActiveRooms from '../../components/HomePageComponents/ActiveRooms/ActiveRooms.component';

import { Container } from './HomePage.styles';

const HomePage = () => {
    const [response, setResponse] = useState('');

    useEffect(() => {
        const socket = io('http://localhost:8080');
        socket.emit('showActiveRooms');
        socket.on('activeRooms', data => {
            setResponse(data);
            console.log(`sobe: ${data}`);
        });
    }, []);

    return (
        <Container>
            <Form />
            <ActiveRooms activeRooms={response} />
        </Container>
    )
}

export default HomePage;
