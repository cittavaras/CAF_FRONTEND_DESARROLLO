import React, { Component } from 'react'
import axios from 'axios'
import styled from "styled-components";
import Navigation from './Navigation';
import { Link } from 'react-router-dom';

export default class CrearAlumno extends Component {

  state = {
    alumnos: [],
    nombre: '',
    rut: '',
    correo: '',
    carrera: '',
    jornada: '',
    active: false,
    tipoUsuario: 'Alumno'
  }

  async componentDidMount() {
    const res = await axios.get('https://gym.ivaras.cl/api/alumnos');
    this.setState({ alumnos: res.data });
  }

  onChangeAlumno = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = async (e) => {
    e.preventDefault();

    if (!this.state.nombre || !this.state.rut || !this.state.correo || !this.state.carrera || !this.state.jornada) {
      alert('Todos los campos son obligatorios');
      return 
    }

    else if (!this.validarCorreoElectronico(this.state.correo)) {
      alert('El correo debe ser de duoc');
      return;
    }
    else {
      const newAlumno = {
        nombre: this.state.nombre,
        rut: this.state.rut,
        correo: this.state.correo,
        carrera: this.state.carrera,
        jornada: this.state.jornada,
        active: this.state.active,
        tipoUsuario: this.state.tipoUsuario
      }

      const res = await axios.post('https://gym.ivaras.cl/api/alumnos', newAlumno);
      console.log('res', res);
      alert('Solicitud enviada correctamente');
      window.location.href = "/notificacion";
    }

  }

  validarCorreoElectronico(correo) {
    const expresionRegular = /^[a-zA-Z0-9._%+-]+@(duocuc\.cl|duoc\.profesor\.cl)$/;
    return expresionRegular.test(correo);
  }

  render() {

    return (
      <>
        <Navigation />
        <Login className='login'>
          <form className="form-horizontal" >
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet"></link>
            <H1>REGISTRO</H1>
            <H2>Presiona cada casilla para registrar</H2>
            <div className="form-group">
              <InputN type="text" placeholder="NOMBRE COMPLETO:" name="nombre" onChange={this.onChangeAlumno} />
            </div>
            <div className="form-group">
              <InputR type="text" placeholder="RUT:" name="rut" onChange={this.onChangeAlumno} />
              <InputCorreo type="mail" placeholder="CORREO DUOC:" name="correo" onChange={this.onChangeAlumno} />
            </div>
            <div className="form-group">
              <Select className="form-control" name="carrera" onChange={this.onChangeAlumno}>
                <option value="a">CARRERA</option>
                <option value="IngInformatica">Ingenieria en Informatica</option>
                <option value="IngElectricidad">Ingenieria en Electricidad</option>
              </Select>
            </div>
            <div className="form-group">
              <SelectJ className="form-control" name="jornada" onChange={this.onChangeAlumno}>
                <option value="a">JORNADA</option>
                <option value="diurno">Diurno</option>
                <option value="vespertino">Vespertino</option>
              </SelectJ>
            </div>
            <Button className="button" onClick={this.onSubmit}>
                ENVIAR SOLICITUD
            </Button>
          </form>
        </Login>
      </>
    )
  }
}

const Login = styled.div`
margin-top: 200px;
display: flex;
justify-content: center;
align-items: center;
`;

const H1 = styled.h1`
font-family: 'lato', sans-serif;
font-size: bold;
font-family: 'lato', sans-serif;
font-size: 40px;
color: #FFFFFF;
@media only screen and (max-width: 768px) {
  font-size: 30px;
}
`;

const H2 = styled.h1`
font-family: 'lato', sans-serif;
font-size: 18px;
margin-bottom: 20px;
color: #FFFFFF;
@media only screen and (max-width: 768px) {
  font-size: 14px;
}
`;

const InputN = styled.input`
  width: 100%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;
  border-radius: 17px;
  font-family: 'lato', sans-serif;
  color: #000000;
  
  &:focus {
    &::placeholder {
      transform: translateY(-15px);
      font-size: 12px;
      color: #000000;
    }
  }

  &::placeholder {
    transition: all 0.3s ease-in-out;
  }
`;

const InputR = styled.input`
  width: 48%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;
  border-radius: 17px;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  width: 100%;
  margin-right: 0;
  font-size: 14px;

    &:focus {
    &::placeholder {
      transform: translateY(-15px);
      font-size: 12px;
      color: #000000;
    }
  }

  &::placeholder {
    transition: all 0.3s ease-in-out;
  }
`;

const InputCorreo = styled.input`
  width: 48%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.5);
  margin-left: 4%;
  margin-bottom: 20px;
  border-radius: 17px;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  width: 100%;
  margin-left: 0;
  font-size: 14px;

    &:focus {
    &::placeholder {
      transform: translateY(-15px);
      font-size: 12px;
      color: #000000;
    }
  }

  &::placeholder {
    transition: all 0.3s ease-in-out;
  }
`;

const Select = styled.select`
width: 100%;
padding: 10px;
background: rgba(255, 255, 255, 0.5);
margin-bottom: 20px;
border-radius: 17px;
font-family: 'Lato', sans-serif;
font-size: 16px;

font-size: 14px;

`;

const SelectJ = styled.select`
width: 100%;
padding: 10px;
background: rgba(255, 255, 255, 0.5);
margin-bottom: 20px;
border-radius: 17px;
font-family: 'Lato', sans-serif;
font-size: 16px;
 
font-size: 14px;

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





