import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, Container, DialogActions, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import useAuth from '../auth/useAuth';
moment.locale("es");


const localizer = momentLocalizer(moment);

const alumno_sesion = JSON.parse(sessionStorage.getItem("alumno_sesion"));

const CALENDAR_TITLE = "AGENDA TU RESERVA";
const CALENDAR_PARAGRAPH = "Selecciona Mes y Día que deseas agendar para ver los bloques disponibles. Luego selecciona el bloque que deseas reservar. Recuerda que solo puedes reservar 3 bloques por día.";

const ReservarSesion = (props) => {

  const { alumno } = useAuth();

  const [selectedEvents, setSelectedEvents] = useState([]);

  const [sesiones, setSesiones] = useState([]);

  const [eventos, setEventos] = useState([]);

  const getSesiones = async () => {
    try {
      const res = await axios.get('https://caf.ivaras.cl/api/sesiones');
      setSesiones(res?.data ?? []);
    } catch (error) {
      console.log(error);
    }
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
    getSesiones()
    if (props.reservasAlumno) {

      const sesionesAlumno = props.reservasAlumno.map(r => {
        return {
          ...r.sesion [0], count:0
        }
      }
      )
        setSelectedEvents(generateTrainingEvents(sesionesAlumno))
      }
  }, []);

  useEffect(() => {
    if (sesiones.length > 0) {
      const generatedEvents = generateTrainingEvents(sesiones)
      setEventos(generatedEvents);
    }
  }, [sesiones]);

  useEffect(() => {
    if (props.open === false) {
      setSelectedEvents([])
    }
  }, [props.open]);

  const eventStyleGetter = (event) => {
    const isSelected = selectedEvents.map(e => e.id).includes(event.id);
    const style = {
      backgroundColor: isSelected ? "yellow" : "#2980b9",
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
          disabled={!event?.isValid}
        >
          {event.title}
        </Button>
      )
    };
  };

  const handleEventClick = (event) => {
    if (!event.isValid) {
      return;
    }
    if(selectedEvents.some(selected => selected.dia === event.dia && selected.id !== event.id ))
    {
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
  };







  return (
    <Container maxWidth="lg" style={{ marginTop: '70px' }}>
      {props.open && <Dialog open={props.open} onClose={props.handleClose} fullWidth maxWidth="md">
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
          <Calendar
            localizer={localizer}
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            views={["week"]}
            toolbar={false}
            selectable={false}
            onSelectEvent={handleEventClick}
            eventPropGetter={eventStyleGetter}
            min={new Date(0, 0, 0, 8, 10)}
            max={new Date(0, 0, 0, 19, 0)}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="success" variant="contained" disabled={selectedEvents.length < 1} onClick={crearReservas}>
            Confirmar reserva
          </Button>
        </DialogActions>
      </Dialog>}
    </Container>
  );
};

const generateTrainingEvents = (sesiones = []) => {
  const newSesiones = sesiones.map(sesion => {
    let [hours, minutes] = sesion.horaIni.split(":");
    const start = moment().day(sesion.dia).set({ hours, minutes }).toDate();
    [hours, minutes] = sesion.horaFin.split(":");
    const end = moment().day(sesion.dia).set({ hours, minutes }).toDate();
    const newSesion = {
      id: sesion.numeroSesion,
      title: `Entrenamiento ${sesion.numeroSesion} ${sesion?.count}/${sesion?.cantidadUsuarios}`,
      start,
      end,
      isValid: sesion.count < sesion.cantidadUsuarios,
      dia: sesion.dia,
    };
    return newSesion;
  })
  return newSesiones;
};


export default ReservarSesion;