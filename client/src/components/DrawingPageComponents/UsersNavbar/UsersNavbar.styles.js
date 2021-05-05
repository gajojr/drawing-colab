import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';

export const Sidebar = styled.aside `
    background-color: #7C5CBF;
    width: 10%;
    min-width: 100px;
    height: 100vh;
    color: #fff;

    @media(max-width: 1024px) {
        width: 25%;
    }
    @media(max-width: 500px) {
        width: 30%;
    }
`;

export const Caption = styled.h3 `
    padding-left: 5px;
`;

export const UserName = styled.p `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
`;

export const StyledClose = styled(IoMdClose)
`
    padding-right: 10px;
    transition: all .4s;
    &:hover {
        cursor: pointer;
        transform: scale(1.3);
    }
`;