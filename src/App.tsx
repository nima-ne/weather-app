import { useRef, useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const apiKey = import.meta.env.VITE_API_KEY;

  const handleSearch = async () => {
    const city = inputRef.current?.value.trim();

    if (!city) {
      alert("Search can not be empty");
      return;
    }

    try {
      const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!result.ok) {
        throw new Error("City not found");
      }
      const data = await result.json();
      setWeatherData(data);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      alert("Choose a valid city name.");
    }
  };

  return (
    <div className="w-[100%] h-[100vh] flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-400">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-6">
   Weather app
</h1>
      <div className="mx-auto bg-white/20 backdrop-blur-md w-[80%] p-8 rounded-3xl shadow-xl md:w-[50%] text-white">
        <div className="flex justify-between items-center w-[100%] mb-6">
          <input
            type="text"
            className="flex-1 bg-white/30 placeholder-white/70 text-white border-none outline-none rounded-full px-6 py-2 placeholder-opacity-80"
            placeholder="Search the city name ..."
            ref={inputRef}
          />
          <button
            onClick={handleSearch}
            className="ml-4 p-3 bg-yellow-400/80 hover:bg-yellow-500 rounded-full transition cursor-pointer"
          >
            <img
              src="image/icons8-search-30.png"
              alt="search"
              className="w-6 h-6"
            />
          </button>
        </div>


        {weatherData && (
          <div className="flex flex-col items-center gap-4 mt-6">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              className="w-28 h-28"
            />
            <h1 className="text-4xl font-bold">{weatherData.name}</h1>
            <h2 className="text-3xl font-semibold">
              {Math.floor(weatherData.main.temp)} °C
            </h2>
            <p className="capitalize text-lg">{weatherData.weather[0].description}</p>

            <div className="flex gap-6 mt-4 text-white text-sm">
              <div className="flex items-center gap-2">
                <img
                  src="image/icons8-humidity-48.png"
                  className="w-6 h-6"
                />
                <span>Humidity: {weatherData.main.humidity}%</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="image/icons8-blowing-snow-50.png"
                  className="w-6 h-6"
                />
                <span>Wind: {weatherData.wind.speed} m/s</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
