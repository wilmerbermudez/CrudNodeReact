import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';


function AppLogin(){

    const [datos, setDatos] = useState({
        usuario: "",
        clave: ""
    });

    const handleInputChange = (e) =>{
        let { name, value } = e.target;
        let newDatos = {...datos, [name]: value};
        setDatos(newDatos)
    }

    const handleSubmit =  async (e)=>{
        e.preventDefault();
        if(!e.target.checkValidity()){
            console.log("no enviar")
        }else {
            let res = await axios.post("http://localhost:3001/usuario/login", datos);
            const { token } = res.data;
            localStorage.setItem('token', token);
            window.location.href = '/empleados';
        }
    }

    return (
        <section className='d-flex align-items-center justify-content-center' style={{minHeight: "100vh"}}>
            <div className='container h-100'>
                <div className="row justify-content-sm-center h-100">
                    <div className='col-xxl-4 col-xl-5 col-lg-5 col-md-7 colsm-9'>
                        <div className='card shadow-lg'>
                            <div className='card-body p-5'>
                                <h1 className='fs-4 fw-bold mb-4'>Login</h1>
                                <form onSubmit={handleSubmit} className='needs-validation' noValidate={true} autoComplete='off'>
                                    <div className='mb-3'>
                                        <label className='mb-2 text-muted' htmlFor='email'>Usuario</label>
                                        <input id='email' type='text' onChange={handleInputChange} value={datos.usuario} className='form-control' name='usuario' required autoFocus/> 
                                        <div className='invalid-feedback'>
                                            Usuario inválido
                                        </div>
                                    </div>
                                    <div className='mb-3'>
                                        <div className='mb-2 w-100'>
                                            <label className='text-muted' htmlFor='password'>Contraseña</label>
                                            <a href='/' className='float-end'>
                                                ¿Olvidaste tu Contraseña?
                                            </a>
                                        </div>
                                        <input id='password' type='password' onChange={handleInputChange} value={datos.clave} className='form-control' name='clave' required/>
                                        <div className='invalid-feedback'>
                                            Contraseña es requerida
                                        </div>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <Button variant="contained" type='submit' color="info">
                                            Login
                                        </Button>
                                    </div>
                                </form>
                            </div>
                            <div className='card-footer py-3 border-0'>
                                <div className='text-center'>
                                    Todos los derechos reservados &copy; 2024
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AppLogin;