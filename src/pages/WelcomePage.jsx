import React from 'react';
import { Link } from 'react-router-dom'; // Usamos Link para la navegación
import Navigation from '../components/Navegation';

const WelcomePage = () => {

    return <>
    <Navigation/>

    <div className="container mt-4">
      <h2 className="text-center mb-4">Servicios de nuestro sistema de monitoreo</h2>

      <div className="row">
        {/* Tarjeta 1: Histórico de Consumo */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <img src="https://icones.pro/wp-content/uploads/2022/03/historique-icone-de-l-historique-bleu.png" className="card-img-top" alt="Histórico de Consumo" />
            <div className="card-body">
              <h5 className="card-title">Histórico de Consumo</h5>
              <p className="card-text">Consulta el histórico de consumo de energía para un análisis detallado.</p>
              <Link to="/consumption-history" className="btn btn-primary">Ver Servicio</Link>
            </div>
          </div>
        </div>

        {/* Tarjeta 2: Porcentaje de Consumo */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <img src="https://static.vecteezy.com/system/resources/previews/017/259/754/non_2x/percent-icon-discount-symbol-on-transparent-background-free-png.png" className="card-img-top" alt="Porcentaje de Consumo" />
            <div className="card-body">
              <h5 className="card-title">Porcentaje de Consumo</h5>
              <p className="card-text">Obtén el porcentaje de consumo en tiempo real para optimizar el uso de la energía.</p>
              <Link to="/consumption-percentaje" className="btn btn-primary">Ver Servicio</Link>
            </div>
          </div>
        </div>

        {/* Tarjeta 3: Monitoreo en Tiempo Real */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <img src="https://cdn-icons-png.freepik.com/512/16139/16139688.png" className="card-img-top" alt="Monitoreo en Tiempo Real" />
            <div className="card-body">
              <h5 className="card-title">Monitoreo en Tiempo Real</h5>
              <p className="card-text">Monitorea el consumo de energía en tiempo real y recibe alertas inmediatas.</p>
              <Link to="/realtime-consumption" className="btn btn-primary">Ver Servicio</Link>
            </div>
          </div>
        </div>

        {/* Nueva Tarjeta: Consumo de Corriente Mensual */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <img src="https://definicion.de/wp-content/uploads/2011/12/mensual.png" className="card-img-top" alt="Consumo Corriente Mensual" />
            <div className="card-body">
              <h5 className="card-title">Consumo Corriente Mensual</h5>
              <p className="card-text">Consulta el consumo de corriente mensual para un análisis detallado.</p>
              <Link to="/monthly-consumption" className="btn btn-primary">Ver Servicio</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
};

export default WelcomePage;
