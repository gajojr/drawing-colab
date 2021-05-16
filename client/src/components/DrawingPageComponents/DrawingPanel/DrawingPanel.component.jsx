import React from 'react';

import BrushesPanel from './BrushesPanel/BrushesPanel.component';
import Canvas from './Canvas/Canvas.component';
import ColorsPalette from './ColorsPalette/ColorsPalette.component';

const DrawingPanel = () => {
    return (
        <div>
            <ColorsPalette />
            <BrushesPanel />
            <Canvas />
        </div>
    )
}

export default DrawingPanel;
