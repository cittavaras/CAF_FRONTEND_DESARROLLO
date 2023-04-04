import React, { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";

<link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet"></link>

const Login = () => {
  const [alumno, setAlumno] = useState('');
  const [contraseña, setContraseña] = useState('');

  const onChangeCorreo = (e) => {
    setAlumno(e.target.value);
  }

  const onChangeConstraseña = (e) => {
    setContraseña(e.target.value);
  }

  const validacion = async (e) => {
    e.preventDefault();
    const res = await axios.get('https://gym.ivaras.cl/api/alumnos');
      try {
        console.log(res);
        const usuario = res.data.alumnos.find(element => element.correo === alumno.trim() && element.password === contraseña ); 
        if (usuario && usuario.active === true) {
          if (usuario.tipoUsuario === 'Admin') {
            alert('Bienvenido administrador');
            window.location.href = "/admin";  
          }
          else if (usuario.tipoUsuario === 'Alumno') {
            alert('Bienvenido alumno'); 
            window.location.href = "/landing";  
          } 
          else  {

            alert('Bienvenido Instructor');
          }
        }
        else if (usuario && usuario.active === false)  {
          alert('Su cuenta aun se  encuentra desactivada')
        }
        else {
          alert('El usuario o contraseña es incorrecto')
        }
      }
      catch (error) {
        console.log(error);
        alert('Ocurrió un error al iniciar sesión')
      }
    ;
  }

  return (
    <>
    <Wrapper>
      <Form className='form-horizontal  d-flex  flex-column '>
        <Title>INICIAR SESIÓN</Title>
        <Input type="text" placeholder="CORREO DUOC:" value={alumno} onChange={onChangeCorreo} />
        <Input type="password" placeholder="CONTRASEÑA:" value={contraseña} onChange={onChangeConstraseña} />
        <Button onClick={validacion}>INICIAR SESIÓN</Button>
      </Form>
    </Wrapper>
  </>
  );
}


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 30px;
  border-radius: 5px;
  background-color: #fff;
  opacity: 0.9;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  font-family: 'Lato, sans-serif';
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


export default Login;
