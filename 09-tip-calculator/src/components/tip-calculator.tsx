"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState<number | null>(null);
  const [tipAmount, setTipAmount] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>();
  const [tipPercentage, setTipPercentage] = useState<number>();

  const handlerBillChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setBillAmount(Number(e.target.value));
  };

  const handlerTipChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTipAmount(Number(e.target.value));
  };

  // const calculateTip = (): void => {
  //   if (billAmount !== null && tipPercentage !== null) {
  //     const tip = billAmount * (tipAmount / 100);
  //     setTipPercentage(tip);
  //     const total = billAmount + tipPercentage;
  //     console.log(total, tipPercentage);
  //   }
  // };

  const calculateTip = (): void => {
    if (billAmount !== null && tipAmount !== null) {
      // Calculate the tip based on the current bill amount and tip percentage
      const tip = billAmount * (tipAmount / 100);

      // Calculate the total by adding the bill amount and the tip
      const total = billAmount + tip;

      // Set the tipPercentage state (if needed)
      setTipPercentage(tip);

      // Log the total and tip directly
      setTotalAmount(total);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Center the tip calculator card within the screen */}
      <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <CardHeader>
          {/* Header with title and description */}
          <CardTitle>Tip Calculator</CardTitle>
          <CardDescription>
            Enter the bill amount and tip percentage to calculate the tip and
            total.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input for bill amount */}
          <div className="grid gap-2">
            <Label htmlFor="bill-amount">Bill Amount</Label>
            <Input
              id="bill-amount"
              type="number"
              placeholder="Enter bill amount"
              value={billAmount !== null ? billAmount : ""}
              onChange={handlerBillChange}
            />
          </div>
          {/* Input for tip percentage */}
          <div className="grid gap-2">
            <Label htmlFor="tip-percentage">Tip Percentage</Label>
            <Input
              id="tip-percentage"
              type="number"
              placeholder="Enter tip percentage"
              value={tipAmount !== null ? tipAmount : ""}
              onChange={handlerTipChange}
            />
          </div>
          {/* Button to calculate tip */}
          <Button onClick={calculateTip}>Calculate</Button>
        </CardContent>
        <CardFooter className="grid gap-2">
          {/* Display the calculated tip amount */}
          <div className="flex items-center justify-between">
            <span>Tip Amount:</span>
            <span className="font-bold">
              ${tipPercentage !== undefined ? tipPercentage : "0.00"}
            </span>
          </div>
          {/* Display the calculated total amount */}
          <div className="flex items-center justify-between">
            <span>Total Amount:</span>
            <span className="font-bold">
              ${totalAmount !== undefined ? Number(totalAmount) : "0.00"}
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TipCalculator;
