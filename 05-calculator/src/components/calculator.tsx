"use client";
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      {/* Center the calculator within the screen */}
      <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        {/* Card header with title */}
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Simple Calculator
          </CardTitle>
        </CardHeader>
        {/* Card content including inputs, buttons, and result display */}
        <CardContent className="space-y-4">
          {/* Input fields for numbers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="num1">Number 1</Label>
              <Input
                id="num1"
                type="number"
                value={numOne}
                onChange={(e) => setNumOne(parseInt(e.target.value))}
                placeholder="Enter a number"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="num2">Number 2</Label>
              <Input
                id="num2"
                type="number"
                value={numTwo}
                onChange={(e) => setNumTwo(parseInt(e.target.value))}
                placeholder="Enter a number"
              />
            </div>
          </div>
          {/* Buttons for arithmetic operations */}
          <div className="grid grid-cols-4 gap-2">
            <Button
              variant="outline"
              onClick={() => sum(Number(numOne), Number(numTwo))}
              className="text-2xl font-bold text-gray-700 dark:text-gray-300"
            >
              +
            </Button>
            <Button
              variant="outline"
              onClick={() => minus(Number(numOne), Number(numTwo))}
              className="text-2xl font-bold text-gray-700 dark:text-gray-300"
            >
              -
            </Button>
            <Button
              variant="outline"
              onClick={() => mul(Number(numOne), Number(numTwo))}
              className="text-2xl font-bold text-gray-700 dark:text-gray-300"
            >
              *
            </Button>
            <Button
              variant="outline"
              onClick={() => div(Number(numOne), Number(numTwo))}
              className="text-2xl font-bold text-gray-700 dark:text-gray-300"
            >
              /
            </Button>
          </div>
          {/* Display the result */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="result">Result</Label>
            <Input
              id="result"
              type="text"
              value={res}
              placeholder="Result"
              readOnly
            />
          </div>
          {/* Clear button to reset inputs and result */}
          <Button variant="outline" onClick={clear} className="w-full">
            Clear
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;
