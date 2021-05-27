import React from 'react';

import BrushesPanel from './BrushesPanel/BrushesPanel.component';
import Canvas from './Canvas/Canvas.component';
import ColorPicker from './ColorPicker/ColorPicker.component';

import { DrawingPanelContainer, SettingsPanel } from './DrawingPanel.styles';

const DrawingPanel = () => {
    return (
        <DrawingPanelContainer>
            <SettingsPanel>
                <ColorPicker />
                <BrushesPanel />
            </SettingsPanel>
            <Canvas />
        </DrawingPanelContainer>
    )
}

export default DrawingPanel;
