import React from 'react';

import * as Styled from './Form.styles';

const Form = () => {
    const onSubmit = e => {
        e.preventDefault();
        console.log(e.target.username.value);
        console.log(e.target.room.value);
    }

    return (
        <form onSubmit={onSubmit}>
            <Styled.Label htmlFor="username">username:</Styled.Label>
            <Styled.Input id="username" type="text" />
            <Styled.Label htmlFor="room">room:</Styled.Label>
            <Styled.Input id="room" type="text" />

            <Styled.Input type="submit" value="join" />
        </form>
    )
}

export default Form;
