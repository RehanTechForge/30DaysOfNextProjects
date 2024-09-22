"use client";
import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface BmiInterface {
  bmi: string;
  category: string;
}

const BmiCalculator = () => {
  const [height, setHeight] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<BmiInterface>();
  const constraintsRef = useRef(null);

  const calculateBmi = () => {
    if (!height || !weight) {
      setError("Please enter both height and weight."); // Alert if either input is empty
      return;
    }
    const heightInMeters = height / 100;
    if (heightInMeters <= 0) {
      setError("Height must be a positive number."); // Alert if height is not positive
      return;
    }

    const weightInKg = weight;
    if (weightInKg <= 0) {
      setError("Weight must be a positive number."); // Alert if weight is not positive
      return;
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters); // Calculate the BMI value
    let category = "";

    if (bmiValue < 18.5) {
      category = "Underweight"; // Set category based on BMI value
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = "Normal";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    setResult({ bmi: bmiValue.toFixed(1), category }); // Set the BMI result state
    setError(""); // Clear any pre
  };
  return (
    <div
      ref={constraintsRef} // Container to limit the drag boundaries
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden"
    >
      <motion.div
        drag // Enable drag
        dragConstraints={constraintsRef} // Limit dragging within the container
        dragElastic={0.2} // Adds some resistance while dragging
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 1,
          ease: "easeInOut",
          delay: 0.2,
        }}
        whileHover={{
          scale: 1.05,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 10,
          },
        }}
        className=" cursor-pointer"
      >
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>BMI Calculator</CardTitle>
            <CardDescription>
              Enter your height and weight to calculate your BMI.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Input for height */}
            <motion.div
              className="grid gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
            >
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="Enter your height"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </motion.div>

            {/* Input for weight */}
            <motion.div
              className="grid gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }}
            >
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter your weight"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </motion.div>

            {/* Button to calculate BMI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" }}
            >
              <Button onClick={calculateBmi}>Calculate</Button>
            </motion.div>

            {/* Display error message if any */}
            {error && (
              <motion.div
                className="text-red-500 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: "easeInOut" }}
              >
                {error}
              </motion.div>
            )}

            {/* Display BMI result if available */}
            {result && (
              <motion.div
                className="grid gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6, ease: "easeInOut" }}
              >
                <div className="text-center text-2xl font-bold">
                  {result.bmi}
                </div>
                <div className="text-center text-muted-foreground">
                  {result.category}
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default BmiCalculator;
