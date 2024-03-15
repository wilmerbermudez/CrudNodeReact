import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';

function AppLogin(){
    return (
        <div className='container'>
            <Button variant="contained" color="info" href={`/empleados`}>
                Login
            </Button>
        </div>
    );
}

export default AppLogin;