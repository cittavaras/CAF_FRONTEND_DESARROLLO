import React, { useState } from 'react';
import './css/landing.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReservarSesion from '../components/ReservarSesion';

<link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet"></link>


const LandingPageAlumno = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // setSelectedEvents([]);
  }

  return (

    <>
      <Div>
        <div className='mt-5 container py-5  text-center'>
          <H1>Hola  <br /> Juan Perez</H1>
          <P className='opcion'>Elige una Opción</P>
          <div className=' d-flex  flex-sm-row flex-column  '>
            <button className='btn' style={{backgroundColor: '#C0D437', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px'}} onClick={handleOpen}>Reservar Sesión</button>
            <Link className='btn' style={{backgroundColor: '#E6E7E9', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px'}}>Sesiones Reservadas</Link>
            <Link className='btn' style={{backgroundColor: '#FCB32E', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px'}}>Mis Sesiones</Link>
            <Link className='btn' style={{backgroundColor: '#042945', color: '#E6E7E9', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px'}}>Historial Avance</Link>
            <Link className='btn' style={{backgroundColor: '#042945', color: '#FCB32E', fontWeight: 'bold', marginBottom: '10px'}}>Rutina de trabajo</Link>
          </div>
        </div>
        {open && <ReservarSesion open={open} setOpen={setOpen} handleClose={handleClose} />}
      </Div>

    </>
  )
}

const Div = styled.div`
  font-family: 'Lato', sans-serif;
  color: white;
  top: 100px;
`;

const H1 = styled.h1`
  font-size: '2rem';
  font-weight: 'bold';
  margin-bottom: '20px';
  text-align: 'center';
  font-family: 'Lato', sans-serif;
  color: white;
`;

const P = styled.p`
  font-size: '1.2rem';
  font-weight: 'bold';
  margin-bottom: '20px';
  text-align: 'center';
  font-family: 'Lato', sans-serif;
  color: white;
`;

export default LandingPageAlumno;