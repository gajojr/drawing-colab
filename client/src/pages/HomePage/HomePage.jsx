import React from 'react';
import Form from '../../components/HomePageComponents/Form/Form.component';
import ActiveRooms from '../../components/HomePageComponents/ActiveRooms/ActiveRooms.component';

import * as Styled from './HomePage.styles';

const HomePage = () => {
    return (
        <Styled.Container>
            <Form />
            <ActiveRooms />
        </Styled.Container>
    )
}

export default HomePage;
