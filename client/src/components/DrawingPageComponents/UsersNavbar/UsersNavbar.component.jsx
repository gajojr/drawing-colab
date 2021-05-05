import React from 'react';

import * as Styled from './UsersNavbar.styles';

const users = ['user1', 'user2', 'user3', 'user4'];
const role = 'admin';

const UsersNavbar = () => {
    return (
        <Styled.Sidebar>
            <Styled.Caption>Users in this room:</Styled.Caption>
            {users.map((item, idx) => <Styled.UserName key={idx}>{item} {role === 'admin' && <Styled.StyledClose onClick={() => console.log('user removed')} />}</Styled.UserName>)}
        </Styled.Sidebar>
    )
}

export default UsersNavbar;
