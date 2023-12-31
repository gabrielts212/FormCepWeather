import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        const { city } = response.data;
        fetchWeather(city);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getUserLocation();
  }, []);

  const fetchWeather = (city) => {
    const apiKey = "7113d500005c402565c5057cfd518400";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    axios
      .get(url)
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(27,27,27)]">
      <div className="p-12 rounded shadow-md bg-gray-600">
        <h1 className="text-4xl font-bold mb-6">Clima em sua localização</h1>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          weatherData.main && (
            <div>
              <h2 className="text-3xl mb-4">{weatherData.name}</h2>

              <p className="text-2xl">
                Temperatura: {weatherData.main.temp.toFixed(1)}°C
              </p>
              <p className="text-2xl">
                Clima: {weatherData.weather[0].description}
              </p>
            </div>
          )
        )}

        <div className="flex flex-col md:flex-row justify-center items-center p-8">
          <Link href="/cep">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded mb-3 md:mb-0 md:mr-2 md:rounded-full text-2xl font-bold w-full md:w-auto">
              Não sei o meu CEP
            </button>
          </Link>
          <Link href="/contact">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded md:ml-2 md:rounded-full text-2xl font-bold w-full md:w-auto">
              Página de contato
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
