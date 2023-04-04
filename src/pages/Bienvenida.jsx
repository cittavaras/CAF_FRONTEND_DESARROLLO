import React from 'react';
import styled from "styled-components";

<link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet"></link>


const Bienvenida = () => {

  const handleRegistroClick = () => {
    window.location.href = '/registro';
  };

  return (
    
      <OuterContainer>
        <Container>
          <Title>¡HOLA!</Title>
          <H2>HAS LLEGADO A UNA NUEVA PLATAFORMA</H2>
          <Paragraph>A CONTINUACIÓN DEBERÁS INGRESAR TUS DATOS PARA LLEVAR UN REGISTRO COTIDIANO DE TUS AVANCES.</Paragraph>
          <Button onClick={handleRegistroClick}>Aceptar</Button>
        </Container>
      </OuterContainer>
    
  )
};



const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(24, 24, 24, 0.15);
  padding: 30px;
  border-radius: 5px;
  opacity: 0.9;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  font-family: 'Lato', sans-serif;
  font-weight: Bold;
  color: #ffffff;
`;

const H2 = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
  font-family: 'Lato', sans-serif;
  color: #ffffff;
`;

const Paragraph = styled.p`
  margin-bottom: 10px;
  font-family: 'Lato', sans-serif;
  color: #C0D437;
  font-weight: Bold;
`;

const Button = styled.button`
  background-color: #959CA1;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  font-family: 'Lato', sans-serif;

  &:hover {
    background-color: #2980b9;
  }
`;

export default Bienvenida;
