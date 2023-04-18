import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import styled from "styled-components";
import useAuth from '../auth/useAuth';
import roles from "../helpers/roles";


const Navigation = () => {

    const navigate = useNavigate();

    const { hasRole, isLogged, logout } = useAuth();

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
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" id="navbarNav">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav show">
                                {!isLogged() &&<>
                                </>}
                                {hasRole(roles.alumno) &&<>
                                </>}
                                {hasRole(roles.admin) &&<>
                                </>}
                                {isLogged() &&
                                <LI className="nav-item">
                                    <Link className="nav-link" onClick={handleLogout}>Cerrar sesion</Link> 
                                </LI>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

const LI = styled.li`
    margin-left: auto;
    right: 0;
`;

export default Navigation;