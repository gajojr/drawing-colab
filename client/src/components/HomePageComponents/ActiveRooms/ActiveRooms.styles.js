import styled from 'styled-components';

export const ActiveRoomsContainer = styled.section `
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    color: #fff;

    @media(max-width: 410px) {
        transform: scale(0.95);
        margin-left: 0px;
    }
`;

export const Header = styled.h1 `
    @media(max-width: 320px) {
        margin-top: 0px;
        margin-bottom: 0px;
    }
`;

export const ListOfRooms = styled.ul `
    list-style-type: none;
    max-height: 212px;
    padding: 5px;
    
    // scrollbar styling

    &::-webkit-scrollbar-track {
        border: 1px solid #000;
        border-radius: 4px;
        padding: 2px 0;
        background-color: #404040;
    }

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #7C5CBF;
        border: 1px solid #000;
    }
`;

export const ListItem = styled.li `
    border: 1px solid #fff;
    display: flex;
    flex-direction: column;
    font-size: 1.25rem;

    @media(max-width: 395px) {
        width: 237px;
    }
`;

export const RoomName = styled.span `
    margin: 5px;
`;

export const JoinBtn = styled.button `
    padding: 5px;
    font-size: 1.25rem;
    border: none;
    background-color: #7C5CBF;
    color: #fff;
    &:hover {
        cursor: pointer;
    }
`;

export const Loading = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const LoadAnimation = styled.div `
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db; 
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export const LoadingText = styled.h3 `
    
`;