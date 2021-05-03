import React from 'react';

import * as Styled from './Form.styles';

const Form = () => {
    const onSubmit = e => {
        e.preventDefault();
        console.log(e.target.username.value);
        console.log(e.target.room.value);
    }

    return (
        <Styled.Form onSubmit={onSubmit}>
            <Styled.Legend>Drawing collab</Styled.Legend>
            <Styled.Label htmlFor="username">username:</Styled.Label>
            <Styled.TextInput id="username" type="text" />
            <Styled.Label htmlFor="room">room:</Styled.Label>
            <Styled.TextInput id="room" type="text" />

            <Styled.Submit type="submit" value="Join" />
        </Styled.Form>
    )
}

export default Form;
