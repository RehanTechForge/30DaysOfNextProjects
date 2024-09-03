"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
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
    <div className="w-[100vw] h-screen bg-black flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Weather Widget</CardTitle>
          <CardDescription>
            Search for the current weather conditions in your city.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Enter a city name"
              value={location}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLocation(e.target.value)
              }
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Search"}{" "}
              {/* Show "Loading..." text while fetching data */}
            </Button>
          </form>
          {/* Display error message if any */}
          {error && <div className="mt-4 text-red-500">{error}</div>}
          {/* Display weather data if available */}
          {weather && (
            <div className="mt-4 grid gap-2">
              {/* Display temperature message with icon */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <ThermometerIcon className="w-6 h-6" />
                  {getTemperatureMessage(weather.temperature, weather.unit)}
                </div>
              </div>
              {/* Display weather description message with icon */}
              <div className="flex items-center gap-2">
                <CloudIcon className="w-6 h-6 " />
                {getWeatherMessage(weather.description)}
                <div></div>
              </div>
              {/* Display location message with icon */}
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-6 h-6 " />
                {getLocationMessage(weather.location)}
                <div></div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherWidget;
