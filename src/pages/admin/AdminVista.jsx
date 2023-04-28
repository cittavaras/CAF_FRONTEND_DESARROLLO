import React from 'react';
import { Grid, Paper, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FormUsuario from './FormUsuario';
import FormParametro from './FormParametro';


const AdminPageContainer = styled(Container)`
  margin-top: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
  opacity: 0.9;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  font-family: 'Lato', sans-serif;
  
`;

const FormContainer = styled(Paper)`
  padding: 40px;
  opacity: 0.9;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Saludo = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-family: 'Lato', sans-serif;
`;

const AdminPage = () => {
  return (
    <>
      <AdminPageContainer maxWidth="lg">
        <FormContainer>
          <Saludo>BIENVENIDO, ADMINISTRADOR</Saludo>
          <FormUsuario />
          <br />
          <FormParametro />
        </FormContainer>
      </AdminPageContainer>
      <div style={{height: '50px'}}></div>
    </>
  );
};


export default AdminPage;
