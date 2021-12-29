import { Button } from '@mui/material';
import React from 'react';
import { useUser, useUserUpdate } from '../../context/userContext';
import {Link} from 'react-router-dom'

const Main = () => {
    const user = useUser()
    const updateUser = useUserUpdate()


    return (
        <div>
            {console.log(user)}
            <Button onClick={() => {updateUser('Derek', true);console.log(user)}}>TEST</Button>
            <Link to="/user">USER PAGE</Link>
            <h1>{user.login}</h1>
        </div>
    );
}

export default Main;