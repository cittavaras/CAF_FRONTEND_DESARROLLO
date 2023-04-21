import axios from 'axios';
import styled from 'styled-components';
import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, Container, DialogActions, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import useAuth from '../auth/useAuth';
import roles from '../helpers/roles';
import AlumnosSesion from './AlumnosSesion'
import {
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

moment.locale("es");
moment.weekdays(true, 2)

const localizer = momentLocalizer(moment);

const alumno_sesion = JSON.parse(sessionStorage.getItem("alumno_sesion"));

const CALENDAR_TITLE = "AGENDA TU RESERVA";
const CALENDAR_PARAGRAPH = "Selecciona Mes y Día que deseas agendar para ver los bloques disponibles. Luego selecciona el bloque que deseas reservar. Recuerda que solo puedes reservar 3 bloques por día.";

const ReservarSesion = (props) => {

  const { alumno, hasRole } = useAuth();
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [sesiones, setSesiones] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [fechaActual, setFechaActual] = useState(moment().toDate());
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedSesion, setSelectedSesion] = useState(null);
  const [alumnosSesion, setAlumnosSesion] = useState([]);

  const handleNavigate = (date, view) => {
    setFechaActual(date);
    setSelectedEvents([]);
  };

  const getSesiones = async () => {
    setLoading(true);
    setEventos([]);
    try {
      const res = await axios.get('https://caf.ivaras.cl/api/sesiones', {
        params: {
          fecha: fechaActual
        }
      });
      setSesiones(res?.data ?? []);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const crearReservas = async (e) => {
    e.preventDefault();
    try {
      const body = {
        rut: alumno.rut,
        sesiones: selectedEvents,
      }
      const res = await axios.post('https://caf.ivaras.cl/api/reservas', body);
      console.log(res);
      alert('Sesiones Reservadas');
      props.handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSesiones();
    if (hasRole(roles.alumno)) {
      props.getReservasByAlumno(fechaActual)
    };
  }, [fechaActual]);

  useEffect(() => {
    if (props.reservasAlumno && hasRole(roles.alumno)) {
      const sesionesAlumno = props.reservasAlumno.map(r => {
        return {
          ...r.sesion[0], count: 0
        }
      }
      )
      setSelectedEvents(generateTrainingEvents(sesionesAlumno, fechaActual))
    }
  }, [props.reservasAlumno]);

  useEffect(() => {
    if (sesiones.length > 0) {
      const generatedEvents = generateTrainingEvents(sesiones, fechaActual)
      setEventos(generatedEvents);
    }
  }, [sesiones, fechaActual]);

  useEffect(() => {
    if (props.open === false) {
      setSelectedEvents([])
    }
  }, [props.open]);

  useEffect(() => {
    if (selectedSesion != null) {
      getAlumnosByNumeroSesion()
    }
  }, [selectedSesion]);

  const eventStyleGetter = (event) => {
    const fechaActual = moment();
    const sesionPasada = moment(event.start).isBefore(fechaActual)
    const colorSesion = sesionPasada ? "green" : "yellow"
    const isSelected = selectedEvents.map(e => e.id).includes(event.id);
    const style = {
      backgroundColor: isSelected ? colorSesion : "#2980b9",
      borderRadius: "0",
      opacity: 1,
      display: "block",
    };
    style.backgroundColor = event.isValid ? style.backgroundColor : "#676d70";
    return {
      style,
      children: (
        <Button
          variant="contained"
          color={isSelected ? "secondary" : "primary"}
          onClick={() => handleEventClick(event)}
          disabled={!event?.isValid || sesionPasada}
        >
          {event.title}
        </Button>
      )
    };
  };

  const handleEventClick = (event) => {
    console.log(event.cantidadUsuarios);
    if (hasRole(roles.alumno)) {
      const fechaActual = moment();
      if (!event.isValid) {
        return;
      }
      if (moment(event.start).isBefore(fechaActual)) {
        alert('No puedes seleccionar un evento pasado');
        return;
      }
      if (selectedEvents.some(selected => selected.dia === event.dia && selected.id !== event.id)) {
        alert('Solo puedes reservar 1 sesion por día');
        return;
      }
      const maxSelections = 3;
      if (
        selectedEvents.length < maxSelections ||
        selectedEvents.map(e => e.id).includes(event.id)
      ) {
        setSelectedEvents((prevState) => {
          if (prevState.map(e => e.id).includes(event.id)) {
            return prevState.filter((e) => e.id !== event.id);
          } else {
            return [...prevState, event];
          }
        });
      } else {
        alert(`¡Solo se permiten seleccionar hasta ${maxSelections} eventos!`);
      }
    } else if (hasRole(roles.admin)) {
      if (event.cantidadUsuarios <= 0) {
        alert('No se puede hacer clic en una sesión sin alumnos');
        return;
      }
      setActiveStep(1);
      setSelectedSesion(event);
    }
  };

  const handleBackClick = () => {
    setActiveStep(0);
    setSelectedSesion(null);
    setAlumnosSesion([]);
  };

  const getAlumnosByNumeroSesion = async () => {
    try {
      console.log('selectedSesion', selectedSesion)
      const res = await axios.get(`https://caf.ivaras.cl/api/sesiones/${selectedSesion.id}/alumnos`);
      setAlumnosSesion(res?.data ?? []);
      console.log('res', res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: '70px' }}>
      {props.open && <Dialog open={props.open} onClose={props.handleClose} fullWidth maxWidth="md" scroll={'paper'}>
        <DialogTitle sx={{ m: 0, p: 2 }} style={{ marginTop: "5px", marginBottom: "20px" }}>
          <IconButton
            style={{ marginTop: "5px", marginBottom: "5px" }}
            aria-label="close"
            onClick={props.handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Typography variant="h5" component="h2">{CALENDAR_TITLE}</Typography>
          <Typography variant="body1" component="p">{CALENDAR_PARAGRAPH}</Typography>
          {hasRole(roles.admin) &&
            <Stepper activeStep={activeStep} alternativeLabel>
              <Step>
                <StepLabel>Selector</StepLabel>
              </Step>
              <Step>
                <StepLabel>Detalle</StepLabel>
              </Step>
            </Stepper>
          }
          {activeStep === 0 && (
            <CustomCalendar
              localizer={localizer}
              events={eventos}
              startAccessor="start"
              endAccessor="end"
              defaultView="week"
              views={["week"]}
              selectable={false}
              onSelectEvent={handleEventClick}
              eventPropGetter={eventStyleGetter}
              min={new Date(0, 0, 0, 9, 0)}
              max={new Date(0, 0, 0, 22, 0)}
              date={fechaActual}
              onNavigate={handleNavigate}
              disabled={loading}
            />
          )}
          {activeStep === 1 && (
            <>
              <AlumnosSesion alumnosSesion={alumnosSesion}/>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBackClick}
              >
                Regresar
              </Button>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {hasRole(roles.alumno) &&
            <Button autoFocus color="success" variant="contained" onClick={crearReservas}>
              Confirmar reserva
            </Button>
          }
        </DialogActions>
      </Dialog>}
    </Container>
  );
};

const generateTrainingEvents = (sesiones = [], fechaActual) => {
  const newSesiones = sesiones.map(sesion => {
    let [hours, minutes] = sesion.horaIni.split(":");
    const start = moment(fechaActual).day(sesion.dia).set({ hours, minutes }).toDate();
    [hours, minutes] = sesion.horaFin.split(":");
    const end = moment(fechaActual).day(sesion.dia).set({ hours, minutes }).toDate();
    const newSesion = {
      id: sesion.numeroSesion,
      title: `Entrenamiento ${sesion.numeroSesion} ${sesion?.count}/${sesion?.cantidadUsuarios}`,
      start,
      end,
      isValid: sesion.count < sesion.cantidadUsuarios,
      dia: sesion.dia,
      cantidadUsuarios: sesion.count
    };
    return newSesion;
  })
  return newSesiones;
};

const CustomCalendar = styled(Calendar)`
  .rbc-calendar {
    min-height: 120vh;
  }
`;

export default ReservarSesion;