import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox
} from "@mui/material";

const AlumnosSesion = ({ alumnosSesion = [], setAlumnosSesion, tomarAsistencia }) => {

    // Este es el manejador de eventos que se ejecuta cada vez que se marca o desmarca un checkbox
    async function handleAsistenciaChange(e, alumno, index) {
        await tomarAsistencia(alumno.reservaId, e.target.checked)
        console.log('alumno.reservaId', alumno.reservaId, 'e.target.checked', e.target.checked)
        console.log('alumno', alumno)
        const newAlumnosSesion = [...alumnosSesion];
        newAlumnosSesion[index].asistencia = e.target.checked;
        setAlumnosSesion(newAlumnosSesion);
    }

    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Asistencia</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Rut</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    alumnosSesion.map((alumno, index) => (
                        <TableRow key={index}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    checked={alumno.asistencia}
                                    onChange={(e) => handleAsistenciaChange(e, alumno, index)}
                                />
                            </TableCell>
                            <TableCell>{alumno.nombre}</TableCell>
                            <TableCell>{alumno.rut}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    </TableContainer>
}
export default AlumnosSesion;