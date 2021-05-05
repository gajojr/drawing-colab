import React from 'react';

// import BrushesPanel from '../../components/DrawingPageComponents/BrushesPanel/BrushesPanel.component';
// import ColorsPanel from '../../components/DrawingPageComponents/ColorsPanel/ColorsPanel.component';
// import DrawingCanvas from '../../components/DrawingPageComponents/DrawingCanvas/DrawingCanvas.component';
import UsersNavbar from '../../components/DrawingPageComponents/UsersNavbar/UsersNavbar.component';

import * as Styled from './DrawingPage.styles';

const DrawingPage = () => {
    return (
        <Styled.DrawingPage>
            <UsersNavbar />
        </Styled.DrawingPage>
    )
}

export default DrawingPage;
