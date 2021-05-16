import React, { useEffect, useContext } from 'react';

// import BrushesPanel from '../../components/DrawingPageComponents/BrushesPanel/BrushesPanel.component';
// import ColorsPanel from '../../components/DrawingPageComponents/ColorsPanel/ColorsPanel.component';
// import DrawingCanvas from '../../components/DrawingPageComponents/DrawingCanvas/DrawingCanvas.component';
import UsersNavbar from '../../components/DrawingPageComponents/UsersNavbar/UsersNavbar.component';

import * as Styled from './DrawingPage.styles';

import { SocketContext } from '../../context/socket';

const DrawingPage = () => {
    const socket = useContext(SocketContext);

    useEffect(() => {
        // we need to reconnect the socket because it was disconnected due url change.
        const username = localStorage.getItem('username');
        const room = localStorage.getItem('room');
        socket.emit('join', { username, room }, error => {
            if (error) {
                alert(error);
                window.location.href = '/';
            }
        });

        // this data won't be necessary anymore so we can remove it
        localStorage.removeItem('username');
        localStorage.removeItem('room');
    }, []);

    return (
        <Styled.DrawingPage>
            <UsersNavbar />
        </Styled.DrawingPage>
    )
}

export default DrawingPage;
