import React, { useEffect } from 'react';
import SensorData from '../components/SensorData';
import Navigation from '../components/Navegation'; 
import About from '../components/About';

const AboutPage = () => {

    useEffect(() => {
        // Cambiar el título de la pestaña
        document.title = 'Sobre nosotros';
    }, []); // Esto se ejecutará cada vez que el título cambie

    return <>
        <Navigation/>
        <About/>
    </>

}
export default AboutPage;