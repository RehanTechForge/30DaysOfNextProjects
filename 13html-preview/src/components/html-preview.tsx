"use client";
import React, { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { predefinedHTML } from "./pre-definedhtml";
const HTMLPreview = () => {
  const [htmlCode, sethtmlCode] = useState<string>("");
  const [previewHTML, setPreviewHTML] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    sethtmlCode(e.target.value);
  };
  const handlePasteHTML = () => {
    setPreviewHTML(predefinedHTML);
  };
  const handleHTMLCode = () => {
    if (htmlCode === "") {
      alert("Please Provide a valid HTML Structure");
      return;
    }
    setPreviewHTML(htmlCode);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground text-gray-600">
      {/* Center the HTML previewer card within the screen */}
      <div className="w-full max-w-2xl p-6 rounded-lg shadow-lg bg-card">
        <h1 className="text-2xl font-bold mb-4 text-center">HTML Previewer</h1>
        <p className="text-muted-foreground mb-4 text-center">
          Enter your HTML code and see the preview.
        </p>
        <div className="grid gap-4">
          {/* Textarea for entering HTML code */}
          <Textarea
            value={htmlCode}
            onChange={handleChange}
            placeholder="Enter your HTML code here..."
            className="p-4 rounded-lg border border-input bg-background text-foreground"
            rows={8}
          />
          {/* Buttons to generate preview and paste predefined HTML */}
          <div className="flex justify-center">
            <div className="flex gap-2">
              <Button onClick={handleHTMLCode}>Generate Preview</Button>
              <Button onClick={handlePasteHTML}>Paste HTML</Button>
            </div>
          </div>
          {/* Div to display the HTML preview */}
          <div className="p-4 rounded-lg border border-input bg-background text-foreground">
            <div dangerouslySetInnerHTML={{ __html: previewHTML }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HTMLPreview;
