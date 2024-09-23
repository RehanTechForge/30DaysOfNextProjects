"use client";
import React, { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import Image from "next/image";
import { CalendarIcon, StarIcon } from "lucide-react";
// Define the MovieDetails type
type MovieDetails = {
  Title: string;
  Year: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  Genre: string;
  Director: string;
  Actors: string;
  Runtime: string;
  Released: string;
};

const MoviesSearch = () => {
  // State to manage the search term input by the user
  const [searchTerm, setSearchTerm] = useState<string>("");
  // State to manage the movie details retrieved from the API
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  // State to manage the loading state during API fetch
  const [loading, setLoading] = useState<boolean>(false);
  // State to manage any error messages from the API
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  async function handleSearch() {
    try {
      setLoading(true);
      const response = await fetch(
        `http://www.omdbapi.com/?t=${searchTerm}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.Response === "False") {
        throw new Error(data.Error);
      }
      setLoading(false);
      setMovieDetails(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error While Fetching Movies: ${error.message}`);
        setError(error.message);
      } else {
        console.log("An unknown error occurred");
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-indigo-200 p-6">
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
        {/* Title of the Movie Search component */}
        <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">
          Movie Search
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Find movie details quickly and easily!
        </p>

        <div className="flex items-center mb-6 space-x-3">
          {/* Search input field */}
          <Input
            type="text"
            placeholder="Enter a movie title"
            value={searchTerm}
            onChange={handleChange}
            className="flex-1 text-gray-700 px-4 py-3 border rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300"
          />
          {/* Search button */}
          <Button
            onClick={handleSearch}
            className="px-5 py-3 bg-black text-white rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Search
          </Button>
        </div>

        {/* Loading spinner */}
        {loading && (
          <div className="flex justify-center items-center mb-4">
            <ClipLoader className="w-8 h-8 text-indigo-500" />
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="text-red-600 text-center mb-4">
            {error}. Please try searching for another movie.
          </div>
        )}

        {/* Movie details */}
        {movieDetails && (
          <div className="flex flex-col items-center">
            {/* Movie poster image */}
            <div className="w-full mb-6">
              <Image
                src={
                  movieDetails.Poster !== "N/A"
                    ? movieDetails.Poster
                    : "/placeholder.svg"
                }
                alt={movieDetails.Title}
                width={250}
                height={375}
                className="rounded-md shadow-md mx-auto hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Movie information */}
            <div className="w-full text-center space-y-3">
              <h2 className="text-2xl font-bold text-gray-800">
                {movieDetails.Title}
              </h2>
              <p className="text-gray-600 italic">{movieDetails.Plot}</p>

              <div className="text-gray-500 flex flex-wrap justify-center gap-3">
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-1 text-indigo-500" />
                  <span>{movieDetails.Year}</span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="w-5 h-5 mr-1 fill-yellow-500" />
                  <span>{movieDetails.imdbRating}</span>
                </div>
              </div>

              <div className="text-gray-500">
                <p>
                  <strong>Genre:</strong> {movieDetails.Genre}
                </p>
                <p>
                  <strong>Director:</strong> {movieDetails.Director}
                </p>
                <p>
                  <strong>Actors:</strong> {movieDetails.Actors}
                </p>
                <p>
                  <strong>Runtime:</strong> {movieDetails.Runtime}
                </p>
                <p>
                  <strong>Released:</strong> {movieDetails.Released}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesSearch;
