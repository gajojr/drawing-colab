import React, { useEffect, useContext } from 'react';

import Canvas from './Canvas/Canvas.component';
import ColorPicker from './ColorPicker/ColorPicker.component';

import { SocketContext } from '../../../context/socket';

import { DrawingPanelContainer, SettingsPanel, ClearCanvasBtn } from './DrawingPanel.styles';

const DrawingPanel = () => {
    const socket = useContext(SocketContext);

    return (
        <DrawingPanelContainer>
            <SettingsPanel id='settings-panel'>
                <ColorPicker />
            </SettingsPanel>
            <ClearCanvasBtn onClick={() => socket.emit('clear-canvas')}>clear canvas</ClearCanvasBtn>
            <Canvas />
        </DrawingPanelContainer>
    )
}

export default DrawingPanel;
