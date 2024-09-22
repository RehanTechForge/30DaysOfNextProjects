"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
interface JokeResponse {
  setup: string;
  punchline: string;
}

const RandomJoke = () => {
  const [joke, setJoke] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const res = await response.json();

      setJoke(`${res.setup} - ${res.punchline}`);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke("Failed to fetch joke. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#ffa500] to-[#ff6b6b] p-4">
      {/* Center the joke card within the screen */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
      >
        {/* Header with title */}
        <h1 className="text-3xl font-bold mb-4 text-[#333] text-center">
          😂 Random Joke 👈
        </h1>
        {/* Display the joke or a loading message */}
        <div className="bg-[#f5f5f5] rounded-lg p-6 mb-6 text-[#555] text-lg text-center">
          {joke || "Loading..."}
        </div>
        {/* Button to fetch a new joke */}
        <motion.button
          className="bg-[#4caf50] hover:bg-[#43a047] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          disabled={isLoading}
          onClick={fetchJoke}
          whileHover={{ scale: 1.05 }} // Scale effect on hover
          whileTap={{ scale: 0.95 }} // Slightly shrink on tap
        >
          😂 Get New Joke 😂
        </motion.button>
      </motion.div>
    </div>
  );
};

export default RandomJoke;
