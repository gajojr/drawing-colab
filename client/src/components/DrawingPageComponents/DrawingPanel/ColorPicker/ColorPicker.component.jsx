import React, { useState } from 'react';

import { ChromePicker } from 'react-color';

import { ColorPickerContainer, ToggleButton, CurrentPick } from './ColorPicker.styles';

const ColorPicker = () => {
    const [color, setColor] = useState('#000');
    const [showColorPicker, setShowColorPicker] = useState(false);

    return (
        <ColorPickerContainer>
            <ToggleButton onClick={() => setShowColorPicker(!showColorPicker)}>{showColorPicker ? ' close color picker ' : ' open color picker '}</ToggleButton>
            {
                showColorPicker &&
                <div style={{ margin: 5 }}>
                    <ChromePicker
                        color={color}
                        onChange={updatedColor => setColor(updatedColor.hex)}
                    />
                </div>
            }
            <CurrentPick id='currentColor'>Current pick: {color} <div style={{ height: 15, width: 15, backgroundColor: color }}></div></CurrentPick>
        </ColorPickerContainer>
    )
}

export default ColorPicker;
