import React from 'react'

import { BrushSizePickerContainer, SizePicker } from './BrushSizePicker.styles';

const BrushSizePicker = () => {
    return (
        <BrushSizePickerContainer>
            <span>pick a brush size:</span>
            <SizePicker type="number" defaultValue="5" id="brush_size" />
        </BrushSizePickerContainer>
    )
}

export default BrushSizePicker
