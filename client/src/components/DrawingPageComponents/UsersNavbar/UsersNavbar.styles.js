import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';

export const Sidebar = styled.aside `
    background-color: #7C5CBF;
    width: 10%;
    min-width: 100px;
    height: 100vh;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media(max-width: 1024px) {
        width: 25%;
    }
    @media(max-width: 500px) {
        width: 30%;
    }
`;

export const UsersInfo = styled.div `
    
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

export const LeaveButton = styled.button `
    width: 90%;
    align-self: center;
    background-color: rgb(35,4,157);
    color: white;
    font-weight: bold;
    font-size: 0.875rem;
    border: none;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 15px;
    &:hover {
        cursor: pointer;
    }
`;