import React, { useState } from 'react';

import { ChromePicker } from 'react-color';

import { ColorPickerContainer, ToggleButton, CurrentPick } from './ColorPicker.styles';

const ColorPicker = () => {
    const [color, setColor] = useState('#fff');
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
            <CurrentPick>Current pick: {color}</CurrentPick>
        </ColorPickerContainer>
    )
}

export default ColorPicker;
