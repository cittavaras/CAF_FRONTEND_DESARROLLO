import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/css/style.css';

import Inicio from "../pages/Inicio"
import Bienvenida from '../pages/Bienvenida';
import CrearAlumno from '../components/CrearAlumno'

import Notificacion from "../pages/notificacion";

import LandingPageAlumno from "../pages/LadingPageAlumno";
import BloquesDisponibles from "../pages/BloquesDisponibles";
import Login from '../pages/Login';
import MetricaAlumno from '../pages/MetricaAlumno';
import AdminPage from "../pages/AdminVista";
import ListarAlumno from "../components/ListarAlumno";

import NotFoundPage from "../pages/NotFoundPage";

import Layout from "../layouts/Layout";
import PrivateRoute from './PrivateRoute'


export default function AppRouter(){
  return (
     <Router>
      <Layout>
        <Routes>
            {/* Rutas publicas */}
            <Route path="/qr" element={<Inicio />} />
            <Route path="/" element={<Bienvenida />} />
            <Route path="/registro" Component={CrearAlumno} />

            {/* Creo que no deberia ser una ruta */}
            <Route path="/notificacion" element={<Notificacion />} />

            {/* Rutas privadas */}
            <Route path="/landing" element={<LandingPageAlumno />} />
            <Route path="/disponible" element={<BloquesDisponibles />} />
            <Route path="/login" element={<Login />} />
            <Route path="/metrica" element={<MetricaAlumno />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/listar" Component={ListarAlumno} />

            {/* Ruta que no existe */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>  
     </Router>
  )
}