import React, { useEffect } from 'react';
import ConsumptionPercentage from '../components/ConsumptionPercentage';
import Navigation from '../components/Navegation';

const ConsumptionPercentagePage = () => {

    useEffect(() => {
        // Cambiar el título de la pestaña
        document.title = 'Porcentaje de consumo';
    }, []); // Esto se ejecutará cada vez que el título cambie

    return <>
        <Navigation/>
        <ConsumptionPercentage/>
    </>

}
export default ConsumptionPercentagePage;