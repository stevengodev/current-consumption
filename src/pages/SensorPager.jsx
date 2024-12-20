import React, { useEffect } from 'react';
import SensorData from '../components/SensorData';
import Navigation from '../components/Navegation'; 

const SensorPage = () => {

    useEffect(() => {
        // Cambiar el título de la pestaña
        document.title = 'Sensor';
    }, []); // Esto se ejecutará cada vez que el título cambie

    return <>
        <Navigation/>
        <SensorData/>
    </>

}
export default SensorPage;