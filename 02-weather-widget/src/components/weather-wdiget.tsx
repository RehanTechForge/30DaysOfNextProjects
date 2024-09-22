"use client";
import { motion } from "framer-motion";
import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { CloudIcon, MapPinIcon, ThermometerIcon } from "lucide-react";

interface weatherData {
  temperature: number;
  description: string;
  location: string;
  unit: string;
}

const WeatherWidget = () => {
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<weatherData | null>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedLocation = location.trim();
    if (trimmedLocation === "") {
      setError("Please enter a valid location."); // Set error message if location input is empty
      setWeather(null); // Clear previous weather data
      return;
    }
    setLoading(true); // Set loading state to true
    setError(null); // Clear any previous error messages

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${trimmedLocation}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      const weatherData: weatherData = {
        temperature: data.current.temp_c, // Get temperature in Celsius
        description: data.current.condition.text, // Get weather description
        location: data.location.name, // Get location name
        unit: "C", // Unit for temperature
      };

      setWeather(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("City not found. Please try again.");
      setWeather(null); // Clear previous weather data
    } finally {
      setLoading(false);
    }
  };

  const getTemperatureMessage = (temperature: number, unit: string): string => {
    if (unit === "C") {
      if (temperature < 0) {
        return `It's freezing at ${temperature}°C! Bundle up!`;
      } else if (temperature < 10) {
        return `It's quite cold at ${temperature}°C. Wear warm clothes.`;
      } else if (temperature < 20) {
        return `The temperature is ${temperature}°C. Comfortable for a light jacket.`;
      } else if (temperature < 30) {
        return `It's a pleasant ${temperature}°C. Enjoy the nice weather!`;
      } else {
        return `It's hot at ${temperature}°C. Stay hydrated!`;
      }
    } else {
      // Placeholder for other temperature units (e.g., Fahrenheit)
      return `${temperature}°${unit}`;
    }
  };

  const getWeatherMessage = (description: string): string => {
    switch (description.toLowerCase()) {
      case "sunny":
        return "It's a beautiful sunny day!";
      case "partly cloudy":
        return "Expect some clouds and sunshine.";
      case "cloudy":
        return "It's cloudy today.";
      case "overcast":
        return "The sky is overcast.";
      case "rain":
        return "Don't forget your umbrella! It's raining.";
      case "thunderstorm":
        return "Thunderstorms are expected today.";
      case "snow":
        return "Bundle up! It's snowing.";
      case "mist":
        return "It's misty outside.";
      case "fog":
        return "Be careful, there's fog outside.";
      default:
        return description; // Default to returning the description as-is
    }
  };

  const getLocationMessage = (location: string): string => {
    const curHour = new Date().getHours();
    const isNight = curHour >= 18 || curHour < 6;
    return ` ${location} ${isNight ? "at Night" : "During the Day"}`;
  };

  return (
    <div className="w-[100vw] h-screen bg-gradient-to-r from-blue-900 via-black to-purple-900 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        whileHover={{ scale: 1.05 }}
        className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
      >
        <Card>
          <CardHeader>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Weather Widget
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Search for the current weather conditions in your city.
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-4 mt-4"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Input
                  type="text"
                  placeholder="Enter a city name"
                  value={location}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setLocation(e.target.value)
                  }
                  className="px-4 py-2 rounded-md border dark:bg-gray-700 dark:text-white transition duration-300"
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-md bg-blue-600 text-white dark:bg-blue-500 ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                } transition duration-300`}
                disabled={loading}
              >
                {loading ? "Loading..." : "Search"}
              </motion.button>
            </form>

            {/* Display error message if any */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mt-4 text-red-500"
              >
                {error}
              </motion.div>
            )}

            {/* Display weather data if available */}
            {weather && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
                className="mt-4 grid gap-4"
              >
                {/* Display temperature message with icon */}
                <div className="flex items-center gap-2">
                  <ThermometerIcon className="w-6 h-6 text-blue-500" />
                  <span className="text-lg text-gray-800 dark:text-gray-200">
                    {getTemperatureMessage(weather.temperature, weather.unit)}
                  </span>
                </div>

                {/* Display weather description message with icon */}
                <div className="flex items-center gap-2">
                  <CloudIcon className="w-6 h-6 text-gray-500" />
                  <span className="text-lg text-gray-800 dark:text-gray-200">
                    {getWeatherMessage(weather.description)}
                  </span>
                </div>

                {/* Display location message with icon */}
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-6 h-6 text-red-500" />
                  <span className="text-lg text-gray-800 dark:text-gray-200">
                    {getLocationMessage(weather.location)}
                  </span>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default WeatherWidget;
