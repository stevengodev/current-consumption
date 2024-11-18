import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ref, onValue } from 'firebase/database';
import { database } from '../services/firebaseConfig';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const parseDate = (dateString) => {
    // Convertir fecha del formato "dd/MM/yyyy HH:mm:ss" a un objeto Date
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);

    return new Date(year, month - 1, day, hour, minute, second); // Crear el objeto Date
};

const MonthlyConsumption = () => {
    const [monthlyConsumption, setMonthlyConsumption] = useState([]);
    const [recommendation, setRecommendation] = useState('');

    useEffect(() => {
        const sensorRef = ref(database, 'Sensor/corriente');

        onValue(sensorRef, (snapshot) => {
            const monthlyData = {};

            snapshot.forEach((childSnapshot) => {
                const value = childSnapshot.val();
                const date = parseDate(value.fechaHora); // Usar el nuevo parser de fechas

                if (isNaN(date.getTime())) {
                    console.warn('Fecha inválida:', value.fechaHora);
                    return; // Ignorar entradas con fechas inválidas
                }

                const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

                if (!monthlyData[month]) {
                    monthlyData[month] = 0;
                }

                const currentRMS = parseFloat(value.corrienteRMS);
                if (isNaN(currentRMS)) {
                    console.warn('Valor de corrienteRMS inválido:', value.corrienteRMS);
                    return; // Ignorar entradas con valores inválidos
                }

                monthlyData[month] += currentRMS; // Sumar valores RMS al mes correspondiente
            });

            const data = Object.keys(monthlyData)
                .sort() // Ordenar meses cronológicamente
                .map((month) => ({
                    month,
                    total: monthlyData[month],
                }));

            console.log('Consumo mensual procesado:', data);
            setMonthlyConsumption(data);

            // Generar recomendaciones basadas en el último mes
            const lastMonthConsumption = data[data.length - 1]?.total || 0;
            if (lastMonthConsumption > 300) {
                setRecommendation('¡Advertencia! El consumo del ultimo mes es muy alto. Considere medidas de ahorro.');
            } else if (lastMonthConsumption > 150) {
                setRecommendation('Recomendación: Optimice el consumo energético para reducir el gasto.');
            } else {
                setRecommendation('El consumo del ultimo mes está en niveles óptimos. ¡Buen trabajo!');
            }
        });
    }, []);

    const data = {
        labels: monthlyConsumption.map(d => d.month),
        datasets: [
            {
                label: 'Consumo Energético Mensual (RMS)',
                data: monthlyConsumption.map(d => d.total),
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true, position: 'top' },
            title: { display: true, text: 'Consumo Energético por Mes' },
        },
        scales: {
            x: { title: { display: true, text: 'Mes' } },
            y: { title: { display: true, text: 'Consumo (RMS)' } },
        },
    };

    return (
        <div>
            <h1>Panel de Consumo Energético Mensual</h1>
            <Bar key={JSON.stringify(monthlyConsumption)} data={data} options={options} />
            <div>
                <h2>Recomendaciones</h2>
                <p>{recommendation}</p>
            </div>
        </div>
    );
};

export default MonthlyConsumption;
