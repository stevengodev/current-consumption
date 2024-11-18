import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ref, onValue } from 'firebase/database';
import { database } from '../services/firebaseConfig';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ConsumptionPercentage = () => {
    const [monthlyConsumption, setMonthlyConsumption] = useState([]);
    const [totalConsumption, setTotalConsumption] = useState(0);

    useEffect(() => {
        const sensorRef = ref(database, 'Sensor/corriente');
        onValue(sensorRef, (snapshot) => {
            const monthlyData = {};
            let total = 0;

            snapshot.forEach((childSnapshot) => {
                const value = childSnapshot.val();
                const date = parseDate(value.fechaHora);
                const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                const currentRMS = parseFloat(value.corrienteRMS);

                if (!monthlyData[month]) {
                    monthlyData[month] = 0;
                }
                monthlyData[month] += currentRMS;
                total += currentRMS;
            });

            const data = Object.keys(monthlyData)
                .sort()
                .map((month) => ({ month, total: monthlyData[month] }));

            setMonthlyConsumption(data);
            setTotalConsumption(total);
        });
    }, []);

    const parseDate = (dateString) => {
        const [datePart, timePart] = dateString.split(' ');
        const [day, month, year] = datePart.split('/').map(Number);
        const [hour, minute, second] = timePart.split(':').map(Number);
        return new Date(year, month - 1, day, hour, minute, second);
    };

    const percentageData = monthlyConsumption.map((monthData) => {
        const percentage = ((monthData.total / totalConsumption) * 100).toFixed(2);
        return parseFloat(percentage);
    });

    const getColor = (index) => {
        const colors = [
            'rgba(255,99,132,0.6)', 
            'rgba(54,162,235,0.6)', 
            'rgba(255,206,86,0.6)', 
            'rgba(75,192,192,0.6)', 
            'rgba(153,102,255,0.6)', 
            'rgba(255,159,64,0.6)', 
            'rgba(255,99,132,0.6)', 
            'rgba(54,162,235,0.6)', 
            'rgba(75,192,192,0.6)', 
            'rgba(153,102,255,0.6)'
        ];
        return colors[index % colors.length]; // Repetir los colores si son más de 10 meses
    };

    const data = {
        labels: monthlyConsumption.map(d => d.month),
        datasets: [
            {
                data: percentageData,
                backgroundColor: percentageData.map((_, index) => getColor(index)),
                borderColor: percentageData.map((_, index) => getColor(index)),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right', // Coloca las leyendas al lado derecho
                labels: {
                    boxWidth: 20, // Ajusta el tamaño del cuadro de color en las leyendas
                    font: {
                        size: 14, // Tamaño de las letras
                        weight: 'bold', // Negrita
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value}%`;
                    },
                },
            },
            datalabels: {
                display: true,
                color: 'white',
                formatter: (value) => `${value}%`, 
                font: {
                    weight: 'bold',
                    size: 14,
                },
                anchor: 'center',
                align: 'center',
            },
        },
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Distribución del Consumo Energético (Porcentaje)</h1>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <Pie data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default ConsumptionPercentage;
