import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/css/style.css';

import Inicio from "../pages/Inicio"
import Bienvenida from '../pages/Bienvenida';
import CrearAlumno from '../components/CrearAlumno'

import Notificacion from "../pages/notificacion";

import LandingPageAlumno from "../pages/LadingPageAlumno";
import Login from '../pages/Login';
import MetricaAlumno from '../pages/MetricaAlumno';
import AdminPage from "../pages/admin/AdminVista";
import ListarAlumno from "../components/ListarAlumno";

import NotFoundPage from "../pages/NotFoundPage";

import AgendaReserva from "../components/AgendaReserva";

import Layout from "../layouts/Layout";

import useAuth from '../auth/useAuth';
import roles from '../helpers/roles';
import routes from '../helpers/routes';


export default function AppRouter() {
  const { isLogged } = useAuth();
  useEffect(() => {
    //loadSession();
  }, [isLogged]);
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Rutas publicas */}
          <Route path="/registro" element={
            <PublicRoute>
              <CrearAlumno />
            </PublicRoute>}
          />
          <Route path="/qr" element={
            <PublicRoute>
              <Inicio />
            </PublicRoute>}
          />
          <Route path="/bienvenida" element={
            <PublicRoute>
              <Bienvenida />
            </PublicRoute>}
          />
          <Route path="/" element={
            <PublicRoute>
              <Login />
            </PublicRoute>}
          />
          {/* Ruta que no existe */}
          <Route path="*" element={
            <PublicRoute>
              <NotFoundPage />
            </PublicRoute>}
          />
          <Route path="/notificacion" element={
            <PublicRoute>
              <Notificacion />
            </PublicRoute>}
          />


          {/* Rutas privadas */}
          {/* TODO: Arreglar esta ruta desde el admin y colocando la ruta desde el navegador no se deberia mostrar */}
          <Route path="/landing" element={
            <PrivateRoute >
              <LandingPageAlumno />
            </PrivateRoute>}
          />
          <Route path="/reserva" element={
            <PrivateRoute>
              <AgendaReserva />
            </PrivateRoute>}
          />
          <Route path="/metrica" element={
            <PrivateRoute >
              <MetricaAlumno />
            </PrivateRoute>}
          />
          <Route path="/admin" element={
            <PrivateRoute hasRole={roles.admin} >
              <AdminPage />
            </PrivateRoute>}
          />
          <Route path="/listar" element={
            <PrivateRoute hasRole={roles.admin} >
              <ListarAlumno />
            </PrivateRoute>}
          />
        </Routes>
      </Layout>
    </Router>
  )
}

function PrivateRoute({ children, redirectTo = '/login', hasRole: tipoUsuario }) {
  const { hasRole, isLogged } = useAuth();

  if (tipoUsuario && !hasRole(tipoUsuario)) {
    return <Navigate to={redirectTo} />;
  }

  if (!isLogged()) {
    return <Navigate to={routes.login} />;
  }
  return children;
}

function PublicRoute({ children, redirectTo = '/landing' }) {
  const { isLogged } = useAuth();
  return !isLogged() ? children : <Navigate to={redirectTo} />;
}