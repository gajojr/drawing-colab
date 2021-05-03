import styled from 'styled-components';

export const Form = styled.form `
    padding: 30px;
    background-color: #F7F7FA;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 30px 0px rgba(21,31,99,1);
    -moz-box-shadow: 0px 0px 30px 0px rgba(21,31,99,1);
    box-shadow: 0px 0px 30px 0px rgba(21,31,99,1);

    @media(max-width: 410px) {
        transform: scale(0.95);
    }
`;

export const Legend = styled.legend `
    font-style: italic;
    font-size: 1.65rem;
`;

export const Label = styled.label `
    margin-top: 15px;
    display: block;
    font-family: Helvetica, sans-serif;
    font-size: 1.3rem;
`;

export const TextInput = styled.input `
    margin-top: 6px;
    display: block;
`;

export const Submit = styled.input `
    display: flex;
    justify-self: center;
    align-self: center;
    margin-top: 15px;
    padding: 8px 25px;
    border-radius: 5px;
    font-family: Helvetica, sans-serif;
    font-size: 1.5rem;
    border: none;
    background-color: #7C5CBF;
    color: #fff;
    &:hover {
        cursor: pointer;
    }
`;