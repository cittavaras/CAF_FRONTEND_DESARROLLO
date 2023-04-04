import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import BloquesDisponibles from '../pages/BloquesDisponibles'

const Navigation = () => {

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

    return (
        <>
            <div className='nav-container'>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand">GymIvaras</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto show">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/registro">Registro</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Iniciar Sesion</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/landing">Landing</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/metrica">MetricaAlumno</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin">Admin</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/listar">Listar</Link>
                                </li>
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
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navigation;