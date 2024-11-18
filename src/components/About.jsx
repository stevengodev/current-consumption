import React from 'react';
import { Link } from 'react-router-dom';
import './../assets/stylesAbout.css'; // Para agregar estilos personalizados

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">Bienvenido al Sistema de Monitoreo de Consumo de Energía</h1>
        <p className="about-text">
          Este proyecto está diseñado para monitorear y analizar el consumo de energía eléctrica en tiempo real. 
          A través de nuestros servicios, podrás acceder a datos históricos de consumo, ver porcentajes de uso, 
          y obtener análisis detallados para optimizar el consumo de energía.
        </p>
        <p className="about-text">
          Nuestro objetivo es brindarte herramientas para que puedas tomar decisiones informadas sobre el uso de energía 
          y reducir costos, al mismo tiempo que contribuyes al cuidado del medio ambiente.
        </p>
        <Link to="/home" className="btn btn-primary">Explorar Servicios</Link>
      </div>
    </div>
  );
};

export default About;
