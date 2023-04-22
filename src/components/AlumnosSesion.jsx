import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";

const AlumnosSesion = ({ alumnosSesion = [] }) => {
    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Rut</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    alumnosSesion.map(alumno => (
                        <TableRow>
                            <TableCell>{alumno.nombre}</TableCell>
                            <TableCell>{alumno.rut}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    </TableContainer>
}
export default AlumnosSesion;