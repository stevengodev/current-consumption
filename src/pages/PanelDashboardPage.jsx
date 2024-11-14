import React, { useEffect } from 'react';
import Dashboard from '../components/Dashboard';

const PanelDashboardPage = () => {

    useEffect(() => {
        // Cambiar el título de la pestaña
        document.title = 'Dashboard';
    }, []); // Esto se ejecutará cada vez que el título cambie

    return <>
        <Dashboard/>
    </>

}
export default PanelDashboardPage;