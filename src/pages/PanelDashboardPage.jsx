import React, { useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import Navigation from '../components/Navegation';

const PanelDashboardPage = () => {

    useEffect(() => {
        // Cambiar el título de la pestaña
        document.title = 'Dashboard';
    }, []); // Esto se ejecutará cada vez que el título cambie

    return <>
        <Navigation />
        <Dashboard />
    </>

}
export default PanelDashboardPage;