import React from 'react';

import Form from '../../components/HomePageComponents/Form/Form.component';
import ActiveRooms from '../../components/HomePageComponents/ActiveRooms/ActiveRooms.component';

import { Container } from './HomePage.styles';

const HomePage = ({ socket }) => {
    return (
        <Container>
            <Form socket={socket} />
            <ActiveRooms socket={socket} />
        </Container>
    )
}

export default HomePage;
