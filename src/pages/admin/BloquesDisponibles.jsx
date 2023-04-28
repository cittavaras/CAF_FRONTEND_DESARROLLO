import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
moment.locale("es");

const localizer = momentLocalizer(moment);

const BloquesDisponibles = ({open, setOpen, selectedEvents, SetSelectedEvents, activeStep, setActiveStep, handleOpen, handleClose }) => {
//   const [open, setOpen] = useState(false);
//   const [selectedEvents, setSelectedEvents] = useState([]);
//   const [activeStep, setActiveStep] = useState(0);

//   const handleOpen = () => {
//     setActiveStep(0);
//     setSelectedEvents([]);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setActiveStep(0);
//     setSelectedEvents([]);
//     setOpen(false);
//   };

  const events = generateTrainingEvents();

  const eventStyleGetter = (event) => {
    const isSelected = selectedEvents.includes(event.id);
    const style = {
      backgroundColor: isSelected ? "yellow" : "#3174ad",
      borderRadius: "0",
      opacity: 1,
      display: "block"
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
      setActiveStep(1);
    } else {
      alert(`¡Solo se permiten seleccionar hasta ${maxSelections} eventos!`);
    }
  };

  const handleBackClick = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step>
            <StepLabel>Selector</StepLabel>
          </Step>
          <Step>
            <StepLabel>Detalle</StepLabel>
          </Step>
        </Stepper>
        <DialogContent>
          {activeStep === 0 && (
            <Calendar
              localizer={localizer}
              events={events}
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
          )}
          {activeStep === 1 && (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Edad</TableCell>
                      <TableCell>Rut</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>20</TableCell>
                      <TableCell>20.311.342-3</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>19</TableCell>
                      <TableCell>21.312.421-1</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Bob Johnson</TableCell>
                      <TableCell>21</TableCell>
                      <TableCell>20.313.452-1</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
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
      </Dialog>
    </>
  );
};

const generateTrainingEvents = () => {
  const events = [];
  let id = 0;

  for (let day = 1; day <= 5; day++) {
    let startTime = moment().day(day).hour(8).minute(10);
    let endTime = moment().day(day).hour(19);

    while (startTime.isBefore(endTime)) {
      const end = startTime.clone().add(2, "hours").add(15, "minutes");
      events.push({
        id: id++,
        title: "Entrenamiento",
        start: startTime.toDate(),
        end: end.toDate()
      });
      startTime = end;
    }
  }

  return events;
};

export default BloquesDisponibles;
