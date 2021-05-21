import styled, { css } from 'styled-components';

import { IoMdClose } from 'react-icons/io';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';

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

export const JoinRequest = styled.div `
    background-color: #7868e6;
    padding: 20px 40px;
    width: 20%;
    position: absolute; 
    right: 0px;
    top: 10px;
    border-radius: 4px;
    border-left: 8px solid #b8b5ff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;

    @media (max-width: 768px) {
        width: 40%;
        padding: 5px 10px;
        justify-content: space-between;
    }
`;

export const Message = styled.span `
    padding: 0 20px;
    font-size: 18px;
    font-weight: 600;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;
const iconsStyle = css `
    &:hover {
        cursor: pointer;
    }
`;

export const AcceptIcon = styled(TiTick)
`${iconsStyle}
margin-right: 10px;
font-size: 32px`;

export const DeclineIcon = styled(AiOutlineCloseCircle)
`${iconsStyle}
font-size: 28px;
`;