import React, { useEffect } from 'react';
import MonthlyConsumption from '../components/MonthlyConsumption';
import Navigation from '../components/Navegation';

const MonthlyConsumptionPage = () => {

    useEffect(() => {
        // Cambiar el título de la pestaña
        document.title = 'Consumo por mes';
    }, []); // Esto se ejecutará cada vez que el título cambie

    return <>
        <Navigation/>
        <MonthlyConsumption/>
    </>

}
export default MonthlyConsumptionPage;