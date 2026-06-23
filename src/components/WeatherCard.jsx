import React from 'react';
import Icon from './Icon.jsx';

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  const { currentTemp, maxTemp, minTemp, currentRain, rainProbability, isMock } = weather;

  const getRecommendation = () => {
    if (currentRain > 0 || rainProbability > 50) {
      return 'Día lluvioso en Santiago. Te recomiendo priorizar abrigos y calzado con resistencia al agua (rainFriendly).';
    }
    if (currentTemp < 12) {
      return 'Bajas temperaturas. Se sugiere vestir en capas y sumar obligatoriamente una parka o chaqueta abrigada.';
    }
    if (currentTemp > 24) {
      return 'Clima caluroso. Ideal para prendas ligeras, poleras de manga corta y vestidos frescos de verano.';
    }
    return 'Temperatura agradable en Santiago. Perfecto para un blazer clásico, zapatillas urbanas o combinaciones casuales.';
  };

  const getWeatherIcon = () => {
    if (currentRain > 0 || rainProbability > 50) {
      return <Icon name="cloud-rain" className="weather-large-icon" style={{ color: '#007aff' }} />;
    }
    if (currentTemp < 14) {
      return <Icon name="snowflake" className="weather-large-icon" style={{ color: '#8ec5fc' }} />;
    }
    if (currentTemp > 25) {
      return <Icon name="sun" className="weather-large-icon" style={{ color: '#ff9500' }} />;
    }
    return <Icon name="cloud-sun" className="weather-large-icon" style={{ color: '#ff9500' }} />;
  };

  return (
    <div className="details-card weather-card-widget">
      <div className="card-header">
        <h3>
          <Icon name="cloud-sun" /> Clima en Santiago
        </h3>
        <p>Santiago de Chile {isMock ? '(Datos Simulados)' : '(Tiempo Real)'}</p>
      </div>

      <div className="weather-body">
        <div className="weather-left">
          {getWeatherIcon()}
          <span className="weather-current-temp">{currentTemp.toFixed(1)}°C</span>
        </div>
        
        <div className="weather-right">
          <div className="weather-metric">
            <span className="metric-label">Max / Min:</span>
            <span className="metric-value">{maxTemp.toFixed(1)}° / {minTemp.toFixed(1)}°C</span>
          </div>
          <div className="weather-metric">
            <span className="metric-label">Prob. Lluvia:</span>
            <span className="metric-value">{rainProbability}%</span>
          </div>
          {currentRain > 0 && (
            <div className="weather-metric">
              <span className="metric-label">Precipitación:</span>
              <span className="metric-value">{currentRain} mm</span>
            </div>
          )}
        </div>
      </div>
      
      <hr className="weather-divider" />
      
      <div className="weather-recommendation">
        <span className="recommendation-badge">Recomendación de Aura:</span>
        <p className="recommendation-text">{getRecommendation()}</p>
      </div>
    </div>
  );
}
