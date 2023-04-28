import React from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import BotonesPerfil from '../components/BotonesPerfil';

<link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet"></link>

const Metrica = () => {
  const [metricas, setMetricas] = useState([]);
  useEffect(() => {

    MetricasAlumno();

  }, []);

  // useEffect(() => {
  //   console.log(metricas);
  // }, [metricas]);

  const MetricasAlumno = async () => {
    // const datosSesion = sessionStorage.getItem("alumno_sesion");
    const {rut} = JSON.parse(sessionStorage.getItem('alumno_sesion'));  
    const res = await axios.post('https://caf-desarrollo.ivaras.cl/api/metricas/alumno', { rut });
    console.log(res.data)
    const metricaAlumno = res.data;
    setMetricas(metricaAlumno);
  }

  

  // Datos de ejemplo
  const data = React.useMemo(
    () => {
      if (metricas) {
        return [
          { metrica: 'Edad', valor: `${metricas?.edad ?? 'No registra métricas'}` },
          { metrica: 'Altura', valor: `${metricas?.altura ?? 'No registra métricas'}` },
          { metrica: 'Peso corporal', valor: `${metricas?.peso ?? 'No registra métricas'}` },
          { metrica: 'Porcentaje de grasa corporal', valor: `${metricas?.porcentajeGrasaCorporal ?? 'No registra métricas'}` },
          { metrica: 'Porcentaje de músculo', valor: `${metricas?.porcentajeGrasaMuscular ?? 'No registra métricas'}` },
          { metrica: 'Índice de masa corporal (IMC)', valor: `${metricas?.imc ?? 'No registra métricas'}` },
          { metrica: 'Grasa visceral', valor: `${metricas?.grasaVisceral ?? 'No registra métricas'}`}
        ];
      } else {
        return [];
      }
    },
    [metricas]
  );
  

  const columns = React.useMemo(
    () => [{ Header: 'Métricas de seguimiento del alumno', accessor: 'metrica' },
    { Header: 'Valor', accessor: 'valor' }],
    []
  );

  const tableInstance = useTable({
    columns,
    data
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <MetricaContainer>
      <BotonesPerfil/>
      <MetricaTitle>Métricas de seguimiento del alumno</MetricaTitle>
      <MetricaTable {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <MetricaRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <MetricaHeader {...column.getHeaderProps()}>
                  {column.render('Header')}
                </MetricaHeader>
              ))}
            </MetricaRow>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <MetricaRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <MetricaCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </MetricaCell>
                  );
                })}
              </MetricaRow>
            );
          })}
        </tbody>
      </MetricaTable>
    </MetricaContainer>
  );
};

const MetricaContainer = styled.div`
  margin-top: 70px; 
  font-family: 'lato, sans-serif';
  color: white;
  top: 100px;
  justify-content: center;
  align-items: center;
`;

const MetricaTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MetricaTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  justify-content: center;
  align-items: center;
  background-position: center;
`;

const MetricaRow = styled.tr`
  &:nth-child(even) {
    background-color: #333333;
  }
`;

const MetricaHeader = styled.th`
  text-align: left;
  padding: 8px;
  border: 1px solid #fff;
`;

const MetricaCell = styled.td`
  text-align: left;
  padding: 8px;
  border: 1px solid #fff;
`;

export default Metrica;
