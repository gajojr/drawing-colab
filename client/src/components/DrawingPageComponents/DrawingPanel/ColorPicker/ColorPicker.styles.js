import styled from 'styled-components';

export const ColorPickerContainer = styled.div `
    display: flex;
    flex-direction: column;
`;

export const ToggleButton = styled.button `
    background-color: #892cdc;
    color: #fff;
    border-radius: 5px;
    border: none;
    padding: 7px;
    margin: 5px 5px 0 0;

    &:hover {
        cursor: pointer;
    }
`;

export const CurrentPick = styled.h4 `
    margin-right: 5px;
`;