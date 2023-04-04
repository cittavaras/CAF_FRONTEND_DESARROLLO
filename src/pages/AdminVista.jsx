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
`;

const FormContainer = styled(Paper)`
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.9);
`;

const Saludo = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const AdminPage = () => {
  return (
    <>
      <AdminPageContainer maxWidth="lg">
        <FormContainer>
          <Saludo>Bienvenido, Administrador</Saludo>
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
