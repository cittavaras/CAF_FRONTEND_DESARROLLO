/* import React, { useState } from "react";

const wrapStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  overflow: "hidden",
};

const calendarContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
  backgroundColor: "#f0f0f0",
};

const monthContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "1rem",
  overflowX: "scroll",
  whiteSpace: "nowrap",
};

const monthStyle = {
  display: "inline-block",
  padding: "0.5rem",
  textAlign: "center",
  backgroundColor: "#ffffff",
  margin: "0 3px",
  borderRadius: "4px",
};

const monthHoverStyle = {
  ...monthStyle,
  backgroundColor: "#eeeeee",
};

const selectedMonthStyle = {
  ...monthStyle,
  backgroundColor: "#C0D437",
};

const currentMonthStyle = {
  ...monthStyle,
  backgroundColor: "#C0D437",
};

const daysContainerStyle = {
  display: "flex",
  justifyContent: "center",
  overflowX: "scroll",
  whiteSpace: "nowrap",
};

const dayStyle = {
  display: "inline-block",
  padding: "1rem",
  textAlign: "center",
  backgroundColor: "#ffffff",
  margin: "0 3px",
  borderRadius: "4px",
};

const dayHoverStyle = {
  ...dayStyle,
  backgroundColor: "#eeeeee",
};

const selectedDayStyle = {
  ...dayStyle,
  backgroundColor: "#77d3ef",
};

const currentDayStyle = {
  ...dayStyle,
  backgroundColor: "#C0D437",
};


const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState(-1);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const days = Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, i) => i + 1);

  const handleMouseEnter = (index) => {
    setHoveredDay(index);
  };

  const handleMouseLeave = () => {
    setHoveredDay(-1);
  };

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const [selectedDay, setSelectedDay] = useState(null);

  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const getWeekDay = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return weekDays[date.getDay()];
  };

  const handleMonthClick = (monthIndex) => {
  setSelectedMonth(monthIndex);
  setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), monthIndex));
};

return (
  <div style={wrapStyle}>
    <div style={calendarContainerStyle}>
      <div style={monthContainerStyle}>
        {monthNames.map((month, index) => {
          const isSelected = index === selectedMonth;
          const isCurrentMonth = index === new Date().getMonth() && currentYear === new Date().getFullYear();

          return (
            <div
              key={index}
              onClick={() => handleMonthClick(index)}
              style={
                isSelected
                  ? selectedMonthStyle
                  : isCurrentMonth
                  ? currentMonthStyle
                  : monthStyle
              }
            >
              {month}
            </div>
          );
        })}
      </div>
        <div style={daysContainerStyle}>
    {days.map((day, index) => {
      const isToday =
        day === new Date().getDate() &&
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear();
      const isSelected = day === selectedDay;

      const dayDisplayStyle = isSelected
        ? selectedDayStyle
        : isToday
        ? currentDayStyle
        : dayStyle;

          return (
        <div
          key={index}
          onClick={() => handleDayClick(day)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          style={index === hoveredDay && !isSelected ? dayHoverStyle : dayDisplayStyle}
        >
          <div>{day}</div>
          <div>{getWeekDay(day)}</div>
        </div>
      );
    })}
  </div>
    </div>
  </div>
);
};

export default Calendar;

 */

//TODO: Comente esto el 21-04-2023
//  import axios from 'axios';
// import styled from 'styled-components';
// import React, { useState, useEffect } from "react";
// import { Button, Dialog, DialogContent, Container, DialogActions, DialogTitle, IconButton, Typography, Box } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "moment/locale/es";
// import useAuth from '../auth/useAuth';
// import roles from '../helpers/roles';

// import { withResizeDetector } from 'react-resize-detector';


// import AlumnosSesion from './AlumnosSesion'
// import {
//   Stepper,
//   Step,
//   StepLabel,
// } from "@mui/material";

// moment.locale("es");
// moment.weekdays(true, 2)

// const localizer = momentLocalizer(moment);

// const messages = {
//   today: 'hoy',
//   next: 'siguiente',
//   previous: 'anterior',
// };

// const alumno_sesion = JSON.parse(sessionStorage.getItem("alumno_sesion"));


// const CALENDAR_TITLE = "Reserva tu Entrenamiento";
// const CALENDAR_PARAGRAPH = "Selecciona Mes y Día que deseas agendar para ver los bloques disponibles. Luego selecciona el bloque que deseas reservar. Recuerda que solo puedes reservar 3 bloques por semana.";

// const StyledDialogTitle = styled(DialogTitle)`
//   margin-top: 5px;
//   margin-bottom: 20px;
// `;

// const StyledIconButton = styled(IconButton)`
//   margin-top: 5px;
//   margin-bottom: 5px;
// `;

// const TitleContainer = styled(Box)`
//   text-align: center;
//   margin-bottom: 16px;
// `;

// const CalendarTitle = styled(Typography)`
//   font-weight: bold;
// `;

// const CalendarParagraph = styled(Typography)`
//   margin-bottom: 24px;
// `;


// const ReservarSesion = (props) => {

//   const { alumno, hasRole } = useAuth();
//   const [selectedEvents, setSelectedEvents] = useState([]);
//   const [sesiones, setSesiones] = useState([]);
//   const [eventos, setEventos] = useState([]);
//   const [fechaActual, setFechaActual] = useState(moment().toDate());
//   const [loading, setLoading] = useState(false);
//   const [activeStep, setActiveStep] = useState(0);
//   const [selectedSesion, setSelectedSesion] = useState(null);
//   const [alumnosSesion, setAlumnosSesion] = useState([]);

//   const handleNavigate = (date, view) => {
//     setFechaActual(date);
//     setSelectedEvents([]);
//   };

//   const getSesiones = async () => {
//     setLoading(true);
//     setEventos([]);
//     try {
//       const res = await axios.get('https://caf.ivaras.cl/api/sesiones', {
//         params: {
//           fecha: fechaActual
//         }
//       });
//       setSesiones(res?.data ?? []);
//     } catch (error) {
//       console.log(error);
//     }
//     setLoading(false);
//   }

//   const crearReservas = async (e) => {
//     e.preventDefault();
//     try {
//       const body = {
//         rut: alumno.rut,
//         sesiones: selectedEvents,
//       }
//       const res = await axios.post('https://caf.ivaras.cl/api/reservas', body);
//       console.log(res);
//       alert('Sesiones Reservadas');
//       props.handleClose();
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     getSesiones();
//     if (hasRole(roles.alumno)) {
//       props.getReservasByAlumno(fechaActual)
//     };
//   }, [fechaActual]);

//   useEffect(() => {
//     if (props.reservasAlumno && hasRole(roles.alumno)) {
//       const sesionesAlumno = props.reservasAlumno.map(r => {
//         return {
//           ...r.sesion[0], count: 0
//         }
//       }
//       )
//       setSelectedEvents(generateTrainingEvents(sesionesAlumno, fechaActual))
//     }
//   }, [props.reservasAlumno]);

//   useEffect(() => {
//     if (sesiones.length > 0) {
//       const generatedEvents = generateTrainingEvents(sesiones, fechaActual)
//       setEventos(generatedEvents);
//     }
//   }, [sesiones, fechaActual]);

//   useEffect(() => {
//     if (props.open === false) {
//       setSelectedEvents([])
//     }
//   }, [props.open]);

//   useEffect(() => {
//     if (selectedSesion != null) {
//       getAlumnosByNumeroSesion()
//     }
//   }, [selectedSesion]);

//   const eventStyleGetter = (event) => {
//     const fontSize = props.width < 400 ? "0.8em" : "1em";
//     const fechaActual = moment();
//     const sesionPasada = moment(event.start).isBefore(fechaActual)
//     const colorSesion = sesionPasada ? "green" : "yellow"
//     const isSelected = selectedEvents.map(e => e.id).includes(event.id);
//     const style = {
//       backgroundColor: isSelected ? colorSesion : "#2980b9",
//       borderRadius: "0",
//       opacity: 1,
//       display: "block",
//     };
//     style.backgroundColor = event.isValid ? style.backgroundColor : "#676d70";
//       return {
//     style,
//     children: (
//       <Button
//         variant="contained"
//         color={isSelected ? "secondary" : "primary"}
//         onClick={() => handleEventClick(event)}
//         disabled={!event?.isValid || sesionPasada}
//         style={{
//           fontSize: fontSize,
//           fontFamily: "Roboto, sans-serif",
//           fontWeight: 500,
//           textTransform: "none",
//           padding: "4px 8px",
//         }}
//       >
//         {event.title} 
//       </Button>
//     )
//   };

//   };

//   const handleEventClick = (event) => {
//     console.log(event.cantidadUsuarios);
//     if (hasRole(roles.alumno)) {
//       const fechaActual = moment();
//       if (!event.isValid) {
//         return;
//       }
//       if (moment(event.start).isBefore(fechaActual)) {
//         alert('No puedes seleccionar un evento pasado');
//         return;
//       }
//       if (selectedEvents.some(selected => selected.dia === event.dia && selected.id !== event.id)) {
//         alert('Solo puedes reservar 1 sesion por día');
//         return;
//       }
//       const maxSelections = 3;
//       if (
//         selectedEvents.length < maxSelections ||
//         selectedEvents.map(e => e.id).includes(event.id)
//       ) {
//         setSelectedEvents((prevState) => {
//           if (prevState.map(e => e.id).includes(event.id)) {
//             return prevState.filter((e) => e.id !== event.id);
//           } else {
//             return [...prevState, event];
//           }
//         });
//       } else {
//         alert(`¡Solo se permiten seleccionar hasta ${maxSelections} eventos!`);
//       }
//     } else if (hasRole(roles.admin)) {
//       if (event.cantidadUsuarios <= 0) {
//         alert('No se puede hacer clic en una sesión sin alumnos');
//         return;
//       }
//       setActiveStep(1);
//       setSelectedSesion(event);
//     }
//   };

//   const handleBackClick = () => {
//     setActiveStep(0);
//     setSelectedSesion(null);
//     setAlumnosSesion([]);
//   };

//   const getAlumnosByNumeroSesion = async () => {
//     try {
//       console.log('selectedSesion', selectedSesion)
//       const res = await axios.get(`https://caf.ivaras.cl/api/sesiones/${selectedSesion.id}/alumnos`);
//       setAlumnosSesion(res?.data ?? []);
//       console.log('res', res);
//     } catch (error) {
//       console.log(error);
//     }
//   }

// return (
//   <Container maxWidth="lg" style={{ marginTop: '70px' }}>
//     {props.open && <Dialog open={props.open} onClose={props.handleClose} fullWidth maxWidth="md" scroll={'paper'}>
//       <StyledDialogTitle sx={{ m: 0, p: 2 }}>
//         <StyledIconButton
//           aria-label="close"
//           onClick={props.handleClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </StyledIconButton>
//       </StyledDialogTitle>

//       <DialogContent>
//         <TitleContainer>
//           <CalendarTitle variant="h4" component="h2">{CALENDAR_TITLE}</CalendarTitle>
//         </TitleContainer>
//         <CalendarParagraph variant="body1" component="p">{CALENDAR_PARAGRAPH}</CalendarParagraph>
//           {hasRole(roles.admin) &&
//             <Stepper activeStep={activeStep} alternativeLabel>
//               <Step>
//                 <StepLabel>Selector</StepLabel>
//               </Step>
//               <Step>
//                 <StepLabel>Detalle</StepLabel>
//               </Step>
//             </Stepper>
//           }
//           {activeStep === 0 && (
//             <CustomCalendar
//               localizer={localizer}
//               events={eventos}
//               startAccessor="start"
//               endAccessor="end"
//               defaultView="week"
//               views={["week"]}
//               selectable={false}
//               onSelectEvent={handleEventClick}
//               eventPropGetter={eventStyleGetter}
//               min={new Date(0, 0, 0, 9, 0)}
//               max={new Date(0, 0, 0, 22, 0)}
//               date={fechaActual}
//               onNavigate={handleNavigate}
//               disabled={loading}
//               messages={ messages }
//             />
//           )}
//           {activeStep === 1 && (
//             <>
//               <AlumnosSesion alumnosSesion={alumnosSesion}/>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleBackClick}
//               >
//                 Regresar
//               </Button>
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           {hasRole(roles.alumno) &&
//             <Button autoFocus color="success" variant="contained" onClick={crearReservas}>
//               Confirmar reserva
//             </Button>
//           }
//         </DialogActions>
//       </Dialog>}
//     </Container>
//   );
// };


// const generateTrainingEvents = (sesiones = [], fechaActual) => {
//   const newSesiones = sesiones.map(sesion => {
//     let [hours, minutes] = sesion.horaIni.split(":");
//     const start = moment(fechaActual).day(sesion.dia).set({ hours, minutes }).toDate();
//     [hours, minutes] = sesion.horaFin.split(":");
//     const end = moment(fechaActual).day(sesion.dia).set({ hours, minutes }).toDate();
//     const newSesion = {
//       id: sesion.numeroSesion,
//       title: `Entrenamiento ${sesion.numeroSesion} ${sesion?.count}/${sesion?.cantidadUsuarios}`,
//       start,
//       end,
//       isValid: sesion.count < sesion.cantidadUsuarios,
//       dia: sesion.dia,
//       cantidadUsuarios: sesion.count
//     };
//     return newSesion;
//   })
//   return newSesiones;
// };

// const CustomCalendar = styled(Calendar)`
//   .rbc-calendar {
//     min-height: 120vh;
//   }

//   .rbc-toolbar {
//     background-color: #ffffff;
//     border-bottom: 1px solid #e0e0e0;
//   }

//   .rbc-toolbar button {
//     color: #000;
//     background-color: transparent;
//     border: none;
//   }

//   .rbc-toolbar button:hover {
//     color: #2980b9;
//     background-color: transparent;
//   }

//   .rbc-header {
//     background-color: #ffffff;
//     color: #000;
//     font-weight: bold;
//     padding: 10px 0;
//   }

//   .rbc-time-view {
//     background-color: #f5f5f5;
//   }

//   .rbc-timeslot-group {
//     border-color: #e0e0e0;
//   }

//   .rbc-time-view .rbc-day-bg.rbc-today {
//     background-color: #e0e0e0;
//   }

//   .rbc-event {
//     background-color: #2980b9;
//     border-radius: 4px;
//     color: #fff;
//     border: none;
//     font-weight: normal;
//     padding: 4px;
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   }

//   .rbc-event:hover {
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   }

//   .rbc-event-label {
//     font-weight: normal;
//     font-size: 0.8em;
//   }
// `;


// export default withResizeDetector(ReservarSesion);