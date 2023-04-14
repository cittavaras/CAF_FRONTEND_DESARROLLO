import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import '../pages/css/style.css';

const CrearAlumno = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [correo, setCorreo] = useState('');
  const [carrera, setCarrera] = useState('');
  const [jornada, setJornada] = useState('');
  const [active, setActive] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState('Alumno');

  useEffect(() => {
    const getAlumnos = async () => {
      const res = await axios.get('https://caf.ivaras.cl/api/alumnos');
      setAlumnos(res.data);
    };

    getAlumnos();
  }, []);

  const onChangeAlumno = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'nombre':
        setNombre(value);
        break;
      case 'rut':
        setRut(value);
        break;
      case 'correo':
        setCorreo(value);
        break;
      case 'carrera':
        setCarrera(value);
        break;
      case 'jornada':
        setJornada(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !rut || !correo || !carrera || !jornada) {
      alert('Todos los campos son obligatorios');
      return;
    } else if (!validarCorreoElectronico(correo)) {
      alert('El correo debe ser de duoc');
      return;
    } else {
      const newAlumno = {
        nombre,
        rut,
        correo,
        carrera,
        jornada,
        active,
        tipoUsuario,
      };

      await axios.post('https://caf.ivaras.cl/api/alumnos', newAlumno);

      await axios
        .post('https://caf.ivaras.cl/api/send-email', {
          to: correo,
          subject: 'Registro CAF Ivaras',
          text: `${nombre}: nos es grato saber que estas interesado(a) en nuestros servicios de CAF Ivaras. En los proximos días activaremos tu cuenta y te enviaremos un correo notificandote como acceder a la plataforma y a sus servicios. Atentamente, el equipo de CAF Ivaras`,
          html: `<strong>${nombre}</strong>: nos es grato saber que estas interesado(a) en nuestros servicios de CAF Ivaras. En los proximos días activaremos tu cuenta y te enviaremos un correo notificandote como acceder a la plataforma y a sus servicios. Atentamente, el equipo de CAF Ivaras`,
        })
        .then((response) => {
          console.log('Email sent successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error sending email:', error);
        });

      window.location.href = '/notificacion';
    }
  };

  const validarCorreoElectronico = (correo) => {
    const expresionRegular = /^[a-zA-Z0-9._%+-]+@(duocuc\.cl|duoc\.profesor\.cl)$/;
    return expresionRegular.test(correo);
  };

  return (
    <OuterContainer>

      <Container>
        <Login className='login'>
          <form className="form-horizontal" >
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet"></link>
            <H1>REGISTRO</H1>
            <H2>Presiona cada casilla para registrar</H2>
            <div className="form-group">
              <InputN type="text" placeholder="NOMBRE COMPLETO:" name="nombre" onChange={onChangeAlumno} />
            </div>
            <div className="form-group">
              <InputR type="text" placeholder="RUT:" name="rut" onChange={onChangeAlumno} />
              <InputCorreo type="mail" placeholder="CORREO DUOC:" name="correo" onChange={onChangeAlumno} />
            </div>
            <div className="form-group">
              <Select className="form-control" name="carrera" onChange={onChangeAlumno}>
                <option value="a">CARRERA</option>
                <option value="IngInformatica">Ingenieria en Informatica</option>
                <option value="IngElectricidad">Ingenieria en Electricidad</option>
              </Select>
            </div>
            <div className="form-group">
              <SelectJ className="form-control" name="jornada" onChange={onChangeAlumno}>
                <option value="a">JORNADA</option>
                <option value="diurno">Diurno</option>
                <option value="vespertino">Vespertino</option>
              </SelectJ>
            </div>
            <Button className="button" onClick={onSubmit}>
              ENVIAR SOLICITUD
            </Button>
          </form>
        </Login>
      </Container>
      <div className="vector1right" />
    </OuterContainer>
  )
}


const OuterContainer = styled.div`
  display: flex;
/*   justify-content: center; */
/*   align-items: center; */
/*   height: 100vh; */
/*   border-style: solid;
  border-width: 2px; */
`;

/* const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: bottom;
  align-items: center;
  align-items: left;
`; */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  padding: 20px;
  border-radius: 5px;
  opacity: 0.9;
  /* padding-right: 100px; */
`;

const Login = styled.div`
margin-top: 100px;
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
color: #FCB924;
@media only screen and (max-width: 768px) {
  font-size: 14px;
}
`;

const InputN = styled.input`
  width: 100%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7);
  opacity: 1;
  margin-bottom: 20px;
  border-radius: 10px;
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
  background: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
  border-radius: 10px;
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
  background: rgba(255, 255, 255, 0.7);
  margin-left: 4%;
  margin-bottom: 20px;
  border-radius: 10px;
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
background: rgba(255, 255, 255, 0.7);
margin-bottom: 20px;
border-radius: 10px;
font-family: 'Lato', sans-serif;
font-size: 16px;

font-size: 14px;

`;

const SelectJ = styled.select`
width: 100%;
padding: 10px;
background: rgba(255, 255, 255, 0.7);
margin-bottom: 20px;
border-radius: 10px;
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

export default CrearAlumno;