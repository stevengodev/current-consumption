import React, { useEffect, useState } from 'react';
import { database } from '../services/firebaseConfig';
import { ref, onValue } from 'firebase/database';

const SensorData = () => {
  const [sensorData, setSensorData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Número de elementos por página

  // Función para convertir la fecha en formato 'dd/MM/yyyy HH:mm:ss' a un objeto Date
  const parseDate = (dateString) => {
    const [date, time] = dateString.split(' ');
    const [day, month, year] = date.split('/');
    const [hour, minute, second] = time.split(':');
    // Devuelve un objeto Date con los valores obtenidos
    return new Date(year, month - 1, day, hour, minute, second);
  };

  useEffect(() => {
    const sensorRef = ref(database, 'Sensor/corriente');
    
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const value = childSnapshot.val();
        data.push({ id: key, ...value });
      });

      // Ordenar los datos por fechaHora (de más reciente a más antiguo)
      data.sort((a, b) => parseDate(b.fechaHora) - parseDate(a.fechaHora));

      setSensorData(data);
    });

    return () => unsubscribe();
  }, []);

  // Lógica para obtener los datos de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sensorData.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(sensorData.length / itemsPerPage);

  // Lógica para mostrar los números de página
  const pageNumbers = [];
  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    if (currentPage > 3) pageNumbers.push('...');
    for (let i = currentPage - 1; i <= currentPage + 1 && i < totalPages; i++) {
      if (i > 1 && i < totalPages) pageNumbers.push(i);
    }
    if (currentPage < totalPages - 2) pageNumbers.push('...');
    pageNumbers.push(totalPages);
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Histórico de Datos del Sensor</h2>

      {sensorData.length > 0 ? (
        <>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Corriente (A)</th>
                <th>Fecha y Hora</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td> {index + 1 + (currentPage - 1) * itemsPerPage} </td>
                  <td>{item.corrienteRMS}</td>
                  <td>{item.fechaHora}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación con números y "..." */}
          <nav>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                  Anterior
                </button>
              </li>

              {pageNumbers.map((number, index) => (
                <li
                  key={index}
                  className={`page-item ${number === currentPage ? 'active' : ''} ${number === '...' ? 'disabled' : ''}`}
                >
                  {number === '...' ? (
                    <span className="page-link">...</span>
                  ) : (
                    <button className="page-link" onClick={() => paginate(number)}>
                      {number}
                    </button>
                  )}
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <p>No hay datos disponibles.</p>
      )}
    </div>
  );
};

export default SensorData;
