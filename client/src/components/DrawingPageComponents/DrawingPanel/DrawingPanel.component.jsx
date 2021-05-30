import React from 'react';

import Canvas from './Canvas/Canvas.component';
import ColorPicker from './ColorPicker/ColorPicker.component';

import { DrawingPanelContainer, SettingsPanel } from './DrawingPanel.styles';

const DrawingPanel = () => {
    return (
        <DrawingPanelContainer>
            <SettingsPanel id='settings-panel'>
                <ColorPicker />
            </SettingsPanel>
            <Canvas />
        </DrawingPanelContainer>
    )
}

export default DrawingPanel;
