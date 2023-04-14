import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import BloquesDisponibles from '../pages/admin/BloquesDisponibles'
import useAuth from '../auth/useAuth';
import roles from "../helpers/roles";

const Navigation = () => {

    const navigate = useNavigate();

    const { hasRole, isLogged, logout } = useAuth();

    const [open, setOpen] = useState(false);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [activeStep, setActiveStep] = useState(0);

    const handleOpen = () => {
        setActiveStep(0);
        setSelectedEvents([]);
        setOpen(true);
    };

    const handleClose = () => {
        setActiveStep(0);
        setSelectedEvents([]);
        setOpen(false);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/');
    };

    return (
        <>
            <div className='nav-container'>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand">CAF Ivaras</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto show">
                                {!isLogged() &&<>
                                </>}
                                {hasRole(roles.alumno) &&<>
                                </>}
                                {hasRole(roles.admin) &&<>
                                <li className="nav-item d-flex justify-content-end">
                                    <button className='nav-link bg-dark' onClick={handleOpen}>Revisar Bloques</button>
                                    {<BloquesDisponibles open={open}
                                        setOpen={setOpen}
                                        selectedEvents={selectedEvents}
                                        SetSelectedEvents={setSelectedEvents}
                                        activeStep={activeStep}
                                        setActiveStep={setActiveStep}
                                        handleClose={handleClose}
                                        handleOpen={handleOpen} />}
                                </li>
                                </>}
                                {isLogged() &&
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={handleLogout}>Cerrar sesion</Link> 
                                </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navigation;