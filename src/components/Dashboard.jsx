import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ref, onValue } from 'firebase/database';
import { database } from '../services/firebaseConfig';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [sensorData, setSensorData] = useState([]);
    const [recommendation, setRecommendation] = useState('');

    useEffect(() => {
        const sensorRef = ref(database, 'Sensor/corriente');
        onValue(sensorRef, (snapshot) => {
            const data = [];
            snapshot.forEach((childSnapshot) => {
                const key = childSnapshot.key;
                const value = childSnapshot.val();
                data.push({ id: key, ...value });
            });
            setSensorData(data);

            // Lógica para generar recomendaciones basadas en el consumo
            const lastReading = data[data.length - 1]; // Obtener el último valor
            if (lastReading && lastReading.corrienteRMS > 10.5) {
                setRecommendation('¡Advertencia! El consumo es alto, considere apagar dispositivos no esenciales.');
            } else if (lastReading && lastReading.corrienteRMS > 5) {
                setRecommendation('Recomendación: Considere optimizar el consumo apagando dispositivos en espera.');
            } else {
                setRecommendation('Consumo normal. ¡Siga así!');
            }
        });
    }, []);

    const data = {
        labels: sensorData.map(d => d.fechaHora),
        datasets: [
            {
                label: 'Consumo Energético (RMS)',
                data: sensorData.map(d => d.corrienteRMS),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true, position: 'top' },
            title: { display: true, text: 'Consumo Energético en Tiempo Real' },
        },
        scales: {
            x: { type: 'category' },
        },
    };

    return (
        <div>
            <h1>Panel de Control de Consumo Energético</h1>
            <Line key={JSON.stringify(sensorData)} data={data} options={options} />
            <div>
                <h2>Recomendaciones</h2>
                <p>{recommendation}</p>
            </div>
        </div>
    );
};

export default Dashboard;
