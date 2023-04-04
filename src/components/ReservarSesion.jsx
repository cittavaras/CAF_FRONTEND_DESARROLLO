import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, Container, DialogActions, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
moment.locale("es");


const localizer = momentLocalizer(moment);

const ReservarSesion = (props) => {

  const getSesiones = async () => {
    try {
      const res = await axios.get('https://gym.ivaras.cl/api/sesiones');
      setSesiones(res?.data??[]);
    } catch(error) {
      console.log(error);
    }
  }

  const [selectedEvents, setSelectedEvents] = useState([]);

  const [sesiones, setSesiones] = useState([]);

  const [eventos, setEventos] = useState([]);

  useEffect(() => {
      getSesiones()
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
    const isSelected = selectedEvents.includes(event.id);
    const style = {
      backgroundColor: isSelected ? "yellow" : "#2980b9",
      borderRadius: "0",
      opacity: 1,
      display: "block",
    };
    return {
      style,
      children: (
        <Button
          variant="contained"
          color={isSelected ? "secondary" : "primary"}
          onClick={() => handleEventClick(event)}
        >
          {event.title}
        </Button>
      )
    };
  };

  const handleEventClick = (event) => {
    const maxSelections = 3;
    if (
      selectedEvents.length < maxSelections ||
      selectedEvents.includes(event.id)
    ) {
      setSelectedEvents((prevState) => {
        if (prevState.includes(event.id)) {
          return prevState.filter((id) => id !== event.id);
        } else {
          return [...prevState, event.id];
        }
      });
    } else {
      alert(`¡Solo se permiten seleccionar hasta ${maxSelections} eventos!`);
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '70px' }}>
      {props.open && <Dialog open={props.open} onClose={props.handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ m: 0, p: 2 }} style={{marginTop: "5px", marginBottom: "20px"}}>
            <IconButton
            style={{marginTop: "5px", marginBottom: "5px"}}
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
          <Button autoFocus color="success" variant="contained">
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
    const newSesion = { id:sesion.numeroSesion, title:`Entrenamiento ${sesion.numeroSesion}`, start, end };
      return newSesion;
  })
  return newSesiones;
};


export default ReservarSesion;