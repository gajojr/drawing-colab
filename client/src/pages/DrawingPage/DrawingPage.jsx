import React from 'react';

import BrushesPanel from '../../components/DrawingPageComponents/BrushesPanel/BrushesPanel.component';
import ColorsPanel from '../../components/DrawingPageComponents/ColorsPanel/ColorsPanel.component';
import DrawingCanvas from '../../components/DrawingPageComponents/DrawingCanvas/DrawingCanvas.component';
import UsersNavbar from '../../components/DrawingPageComponents/UsersNavbar/UsersNavbar.component';

const DrawingPage = () => {
    return (
        <div>
            <p>Ovo ti je drawing page bajo moj</p>
            <BrushesPanel />
            <ColorsPanel />
            <DrawingCanvas />
            <UsersNavbar />
        </div>
    )
}

export default DrawingPage;
