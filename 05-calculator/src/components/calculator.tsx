"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const Calculator = () => {
  const [numOne, setNumOne] = useState<number | string>("");
  const [numTwo, setNumTwo] = useState<number | string>("");
  const [res, setRes] = useState<number | string>("");

  const sum = (num1: number, num2: number): number => {
    const sum = num1 + num2;
    setRes(sum);
    return sum;
  };

  const minus = (num1: number, num2: number): number => {
    const minus = num1 - num2;
    console.log(minus);
    setRes(minus);
    return minus;
  };

  const mul = (num1: number, num2: number): number => {
    const mul = num1 * num2;
    setRes(mul);
    return mul;
  };

  const div = (num1: number, num2: number): number => {
    const div = num1 / num2;
    setRes(div);
    return div;
  };

  const clear = () => {
    setNumOne("");
    setNumTwo("");
    setRes("");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900">
      {/* Center the calculator within the screen */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
      >
        {/* Card header with title */}
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Simple Calculator
          </CardTitle>
        </CardHeader>

        {/* Card content including inputs, buttons, and result display */}
        <CardContent className="space-y-4">
          {/* Input fields for numbers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2 text-gray-700">
              <Label
                htmlFor="num1"
                className="text-gray-700 dark:text-gray-300"
              >
                Number 1
              </Label>
              <Input
                id="num1"
                type="number"
                value={numOne}
                onChange={(e) => setNumOne(parseInt(e.target.value))}
                placeholder="Enter a number"
                className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex flex-col space-y-2 text-gray-700">
              <Label
                htmlFor="num2"
                className="text-gray-700 dark:text-gray-300"
              >
                Number 2
              </Label>
              <Input
                id="num2"
                type="number"
                value={numTwo}
                onChange={(e) => setNumTwo(parseInt(e.target.value))}
                placeholder="Enter a number"
                className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Buttons for arithmetic operations */}
          <div className="grid grid-cols-4 gap-2">
            {["+", "-", "*", "/"].map((operator, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (operator === "+") sum(Number(numOne), Number(numTwo));
                  else if (operator === "-")
                    minus(Number(numOne), Number(numTwo));
                  else if (operator === "*")
                    mul(Number(numOne), Number(numTwo));
                  else if (operator === "/")
                    div(Number(numOne), Number(numTwo));
                }}
                className="text-2xl font-bold text-gray-700 dark:text-gray-300 border rounded-lg p-4 hover:bg-blue-600 hover:text-white transition duration-300"
              >
                {operator}
              </motion.button>
            ))}
          </div>

          {/* Display the result */}
          <div className="flex flex-col space-y-2 text-gray-700">
            <Label
              htmlFor="result"
              className="text-gray-700 dark:text-gray-300"
            >
              Result
            </Label>
            <Input
              id="result"
              type="text"
              value={res}
              placeholder="Result"
              readOnly
              className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Clear button to reset inputs and result */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={clear}
            className="w-full bg-red-500 text-white p-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            Clear
          </motion.button>
        </CardContent>
      </motion.div>
    </div>
  );
};

export default Calculator;
