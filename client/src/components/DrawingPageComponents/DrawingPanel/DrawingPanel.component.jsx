import React, { useContext, useState } from 'react';

import { AiOutlineCaretDown } from 'react-icons/ai';
import { AiOutlineCaretUp } from 'react-icons/ai';

import Canvas from './Canvas/Canvas.component';
import ColorPicker from './ColorPicker/ColorPicker.component';
import BrushSizePicker from './BrushSizePicker/BrushSizePicker.component';

import { SocketContext } from '../../../context/socket';

import { DrawingPanelContainer, CollapseMenuButton, SettingsPanel, ClearCanvasBtn } from './DrawingPanel.styles';

const DrawingPanel = () => {
    const socket = useContext(SocketContext);
    const [collapseSettings, setCollapseSettings] = useState(true);

    return (
        <DrawingPanelContainer>
            <CollapseMenuButton onClick={() => setCollapseSettings(!collapseSettings)}>
                {collapseSettings ? <AiOutlineCaretDown size={18} /> : <AiOutlineCaretUp size={18} />}
            </CollapseMenuButton>
            <SettingsPanel id='settings-panel' style={{ display: `${collapseSettings ? 'none' : 'flex'}` }}>
                <ColorPicker />
                <BrushSizePicker />
            </SettingsPanel>
            <ClearCanvasBtn onClick={() => socket.emit('clear-canvas')}>clear canvas</ClearCanvasBtn>
            <Canvas />
        </DrawingPanelContainer>
    )
}

export default DrawingPanel;
