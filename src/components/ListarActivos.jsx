import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';




const ListarActivos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [paginaNumero, setPaginaNumero] = useState(0);
  const [porPagina, setPorPagina] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState('');


  useEffect(() => {
    getAlumnos();
  }, [paginaNumero]);

  // Función para obtener la lista de alumnos
  const getAlumnos = async () => {
    try {
      const res = await axios.get('https://caf.ivaras.cl/api/alumnos');
      // Filtrar los alumnos que son del tipo 'Alumno' y que no estén activos
      const alumnos = res.data.alumnos.filter(alumno => alumno.tipoUsuario === 'Alumno' && alumno.active === true);
      const startIndex = paginaNumero * porPagina;
      // Seleccionar los alumnos de la página actual según el índice de inicio y la cantidad de elementos por página
      const alumnosSeleccionados = alumnos.slice(startIndex, startIndex + porPagina);
      // Actualizar el estado con los alumnos seleccionados y el total de alumnos obtenidos
      setAlumnos(alumnosSeleccionados);
      setTotalCount(alumnos.length);
    } catch (error) {
      console.log(error);
    }
  }

  const actualizarAlumno = async (e) => {
    e.preventDefault();
    const res = await axios.get(`https://caf.ivaras.cl/api/alumnos/${search}`);
    // const res = await axios.put(`https://caf.ivaras.cl/api/alumnos/${id}`, { active: true });
    // const { correo, nombre } = res.data;
    await axios
      .post('https://caf.ivaras.cl/api/alumnos', {rut: search, })
      .then((response) => {
        console.log('Email sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });

    // console.log(res);
    // console.log(res?.data);

    getAlumnos();
  }

  const handleInputValue = (e) => {
    setSearch(e.target.value);
  }

  // Filtrar por rut
  const filtrarAlumnos = async (e) => {
    e.preventDefault();
    const res = await axios.post(`https://caf.ivaras.cl/api/alumnos/rut`, {rut: search });
    console.log(res);
  }

  // Función para manejar el cambio de página
  const handlePageClick = (e) => {
    const paginaSeleccionada = e.selected; // Página seleccionada
    setPaginaNumero(paginaSeleccionada);
  }; // fin de handlePageClick
  return (
    <>
      <Container maxWidth="md">
        <DivT>


          <h2>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Ingrese el rut del alumno ej: 12345678-9"
                inputProps={{ 'aria-label': 'Ingrese el rut del alumno' }}
                onChange={handleInputValue}
                value={search} />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={filtrarAlumnos}>
                <SearchIcon />
              </IconButton>
            </Paper>
          </h2>
          <Div className="row">
            {
              alumnos.map(alumno => (
                <div className="col-md4 p-2" key={alumno._id}>
                  <div className="card">

                    <div className="card-header d-flex justify-content-between">
                      <h3>{alumno.nombre}</h3>
                      {/* <button type='button' className="btn btn-secondary" onClick={() => { aceptarAlumno(alumno._id) }}> */}
                      <button type='button' className="btn btn-secondary" >
                        Actualizar  Metricas Alumno
                      </button>
                    </div>
                    <div className="card-body">
                      <p>Rut: {alumno.rut}</p>
                      <p>Correo: {alumno.correo}</p>
                      <p>Carrera: {alumno.carrera}</p>
                    </div>
                    <div className="card-footer">

                    </div>
                  </div>

                </div>
              ))
            }
          </Div>

          <ReactPaginate
            previousLabel={'Anterior'}
            nextLabel={'Siguiente'}
            pageCount={Math.ceil(totalCount / porPagina)}
            onPageChange={handlePageClick}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
          />

        </DivT>
      </Container>
    </>
  );
};

const DivT = styled.div`
  font-family: 'Kodchasan';
  margin-top: 100px;
  top: 100px;
`;

const Div = styled.div`
  font-family: 'Kodchasan';
  top: 10px;
`;


export default ListarActivos;
