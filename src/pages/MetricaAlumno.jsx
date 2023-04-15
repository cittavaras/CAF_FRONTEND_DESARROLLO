import React from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';

const Metrica = () => {
  // Datos de ejemplo
  const data = React.useMemo(
    () => [      {        metrica: 'Edad',        valor: '27 años'      },      {        metrica: 'Altura',        valor: '170 cm'      },      {        metrica: 'Peso corporal',        valor: '70 kg'      },      {        metrica: 'Porcentaje de grasa corporal',        valor: '20%'      },      {        metrica: 'Porcentaje de músculo',        valor: '40%'      },      {        metrica: 'Índice de masa corporal (IMC)',        valor: '24.2'      },      {        metrica: 'Grasa visceral',        valor: '10'      }    ],
    []
  );

  const columns = React.useMemo(
    () => [      {        Header: 'Métricas de seguimiento del alumno',        accessor: 'metrica'      },      {        Header: 'Valor',        accessor: 'valor'      }    ],
    []
  );

  const tableInstance = useTable({
    columns,
    data
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <MetricaContainer>
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
  font-family: 'Kodchasan';
  color: white;
  top: 100px;
`;

const MetricaTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MetricaTable = styled.table`
  width: 100%;
  border-collapse: collapse;
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