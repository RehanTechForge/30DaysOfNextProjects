"use client";
import React, { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";

const PasswordGenerator = () => {
  const [length, setLength] = useState<number>(16);
  const [uppercase, setUppercase] = useState<boolean>(true);
  const [lowercase, setLowercase] = useState<boolean>(true);
  const [symbols, setSymbols] = useState<boolean>(true);
  const [numbers, setNumbers] = useState<boolean>(true);
  const [password, setPassword] = useState<string>();

  const generatePassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";
    let possibleChars = "";
    if (uppercase) possibleChars += uppercaseChars;
    if (lowercase) possibleChars += lowercaseChars;
    if (numbers) possibleChars += numberChars;
    if (symbols) possibleChars += symbolChars;
    if (possibleChars === "") {
      alert("At least one character type should be selected!");
      return;
    }
    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * possibleChars.length);
      generatedPassword += possibleChars[randomIndex]; // Generate password character by character
    }
    setPassword(generatedPassword);
  };

  const copyToClipboard = (): void | string => {
    if (password === undefined) {
      return "";
    }
    navigator.clipboard.writeText(password).then(
      () => {
        alert("Password copied to clipboard!"); // Alert on successful copy
      },
      (err) => {
        alert("Failed to copy password to clipboard."); // Alert on failed copy
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Center the password generator card within the screen */}
      <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div className="mx-auto max-w-md space-y-6">
          {/* Header with title and description */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Password Generator</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Create a secure password with just a few clicks.
            </p>
          </div>
          {/* Main content area for password options and input */}
          <div className="space-y-4">
            {/* Input for password length */}
            <div className="space-y-2">
              <Label htmlFor="length">Password Length</Label>
              <Input
                id="length"
                type="number"
                min="8"
                max="32"
                className="w-full"
                value={length}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setLength(Number(e.target.value))
                }
              />
            </div>
            {/* Checkboxes for character type inclusion */}
            <div className="space-y-2">
              <Label>Include:</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={uppercase}
                  onCheckedChange={(checked) => setUppercase(checked === true)}
                />
                <Label htmlFor="uppercase">Uppercase Letters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={lowercase}
                  onCheckedChange={(checked) => setLowercase(checked === true)}
                />
                <Label htmlFor="lowercase">Lowercase Letters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={numbers}
                  onCheckedChange={(checked) => setNumbers(checked === true)}
                />
                <Label htmlFor="numbers">Numbers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={symbols}
                  onCheckedChange={(checked) => setSymbols(checked === true)}
                />
                <Label htmlFor="symbols">Symbols</Label>
              </div>
            </div>
            {/* Button to generate password */}
            <Button type="button" className="w-full" onClick={generatePassword}>
              Generate Password
            </Button>
            {/* Display the generated password and button to copy */}
            <div className="space-y-2">
              <Label htmlFor="password">Generated Password</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="password"
                  type="text"
                  value={password}
                  readOnly
                  className="flex-1"
                />
                <Button type="button" onClick={copyToClipboard}>
                  Copy to Clipboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PasswordGenerator;
