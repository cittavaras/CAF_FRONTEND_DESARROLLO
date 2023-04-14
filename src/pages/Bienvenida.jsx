import React from 'react';
import styled from "styled-components";
import './css/style.css'; 

const Bienvenida = () => {

  const handleRegistroClick = () => {
    window.location.href = '/registro';
  };

  return (
    <OuterContainer>
       <div className="vector-1" />
        <div className="vector-6" />
        <div className="vector-2" />
      <Container>
        <Title>¡HOLA!</Title>
        <H2>HAS LLEGADO A UNA NUEVA PLATAFORMA</H2>
        <Paragraph>A CONTINUACIÓN DEBERÁS INGRESAR TUS DATOS PARA LLEVAR UN REGISTRO COTIDIANO DE TUS AVANCES.</Paragraph>
        <Button className="button" onClick={handleRegistroClick}>ACEPTAR</Button>
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
  align-items: left;
  text-align: left;
  box-shadow: 0px 4px 8px rgba(24, 24, 24, 0.15);
  padding: 30px;
  border-radius: 5px;
  opacity: 0.9;
  padding-right: 100px;
`;

const Title = styled.h1`
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 28px;
  display: flex;
  align-items: center;

  color: #FFFFFF;
`;

const H2 = styled.h2`
  font-size: 11px;
  margin-bottom: 20px;
  font-family: 'Lato', sans-serif;
  color: #ffffff;
`;

const Paragraph = styled.p`
  margin-bottom: 12px;
  font-family: 'Lato', sans-serif;
  color: #C0D437;
  font-weight: normal;
  font-size: 13px;
`;

const Button = styled.button`
  background-color: #959CA1;
  color: #fff;
  border: none;
  padding: 10px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  font-family: 'Lato', sans-serif;
  width: 100px;

  &:hover {
    background-color: #2980b9;
  }
`;

export default Bienvenida;
