import styled from 'styled-components';

export const Container = styled.main `
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #333744;

    @media(max-width: 395px) {
        flex-direction: column;
    }
`;