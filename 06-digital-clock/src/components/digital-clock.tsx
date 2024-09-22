"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [mount, setMount] = useState<boolean>(false);
  const [is24Hour, setIs24Hour] = useState<boolean>(true);

  useEffect(() => {
    setMount(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = useMemo(() => {
    if (!mount) return "";
    const hour = is24Hour
      ? time.getHours().toString().padStart(2, "0")
      : (time.getHours() % 12 || 12).toString().padStart(2, "0");

    const minute = time.getMinutes().toString().padStart(2, "0");
    const second = time.getSeconds().toString().padStart(2, "0");
    return `${hour}:${minute}:${second}`;
  }, [time, is24Hour, mount]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      {/* Center the digital clock within the screen */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 shadow-lg rounded-2xl bg-white dark:bg-gray-800"
      >
        <div className="flex flex-col items-center justify-center">
          {/* Header with title */}
          <div className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-200">
            Digital Clock
          </div>
          {/* Description */}
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Display current time in hours, minutes, and seconds.
          </div>
          {/* Display the formatted time with animation */}
          <motion.div
            key={formattedTime} // Use key to trigger reanimation on time change
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-6xl font-bold tracking-tight text-gray-800 dark:text-gray-200"
          >
            {formattedTime}
          </motion.div>
          {/* Buttons to switch between 24-hour and 12-hour formats */}
          <div className="mt-4 flex items-center">
            <Button
              className="mr-2 font-bold"
              onClick={() => setIs24Hour(true)}
              variant={is24Hour ? "default" : "outline"}
            >
              24-Hour Format
            </Button>
            <Button
              className="mr-2 font-bold"
              onClick={() => setIs24Hour(false)}
              variant={!is24Hour ? "default" : "outline"}
            >
              12-Hour Format
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DigitalClock;
