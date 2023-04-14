import React from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';

const Metrica = () => {
  // Datos de ejemplo
  const data = React.useMemo(
    () => [
      {
        metrica: 'Edad',
        valor: '27 años'
      },
      {
        metrica: 'Altura',
        valor: '170 cm'
      },
      {
        metrica: 'Peso corporal',
        valor: '70 kg'
      },
      {
        metrica: 'Porcentaje de grasa corporal',
        valor: '20%'
      },
      {
        metrica: 'Porcentaje de músculo',
        valor: '40%'
      },
      {
        metrica: 'Índice de masa corporal (IMC)',
        valor: '24.2'
      },
      {
        metrica: 'Grasa visceral',
        valor: '10'
      }
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Métricas de seguimiento del alumno',
        accessor: 'metrica'
      },

      {
        Header: 'Valor',
        accessor: 'valor'
      }
    ],
    []
  );

  const tableInstance = useTable({
    columns,
    data
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <>
    <Div className="metrica-alumno-container">
      <h2>Métricas de seguimiento del alumno</h2>
      <table {...getTableProps()} className="metrica-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="metrica-row">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="metrica-header">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="metrica-body">
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="metrica-row">
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} className="metrica-cell">
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Div>
    </>
  );
};

const Div = styled.div`
  font-family: 'Kodchasan';
  color: white;
  top: 100px;
`;

export default Metrica;