"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

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
    <div className="flex items-center justify-center h-screen">
      {/* Center the digital clock within the screen */}
      <Card className="p-8 shadow-lg rounded-2xl">
        <div className="flex flex-col items-center justify-center">
          {/* Header with title */}
          <div className="text-2xl font-bold tracking-tight">Digital Clock</div>
          {/* Description */}
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Display current time in hours, minutes, and seconds.
          </div>
          {/* Display the formatted time */}
          <div className="text-6xl font-bold tracking-tight">
            {formattedTime}
          </div>
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
      </Card>
    </div>
  );
};

export default DigitalClock;
