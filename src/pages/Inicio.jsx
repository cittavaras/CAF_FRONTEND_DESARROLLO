import React from 'react';
import qr from './img/qr.png';
import './css/inicio.css';
import styled from 'styled-components';

const Div = styled.div`
  font-family: 'Kodchasan';
  color: white;
  top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const Qr = () => {
  return (
    <Div className='container mx-auto' id="inicio">
      <div className='center-text'>
        <h1>Visita nuestro gimnasio</h1>
        <p>Escanea el código de abajo para acceder a nuestro sitio web desde tu dispositivo</p>
      </div>
      <div className='qr-code-container'>
        <img src={qr} alt="Imagen QR" className="img-fluid w-50" style={{ marginBottom: "20px" }} />
      </div>
    </Div>
  );
};

export default Qr;
