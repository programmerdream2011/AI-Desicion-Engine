"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

const handleAnalyze = async () => {
  if (!input.trim()) {
  setResult("Please enter a decision to analyze.");
  return;
}

  setResult("Analyzing...");

  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input,
    }),
  });

  const data = await response.json();

  setResult(data.result);
};

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-6">

        <div>
          <h1 className="text-4xl font-bold">AI Decision Engine</h1>
          <p className="text-zinc-400">
            Analyze difficult life decisions using AI.
          </p>
        </div>

        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Example: University or Startup?"
          className="min-h-[180px] text-lg text-zinc-100"
        />

        <Button onClick={handleAnalyze} className="w-full text-lg h-12">
          Analyze Decision
        </Button>

        {result && (
          <div className="bg-zinc-900 p-4 rounded-lg whitespace-pre-line">
            {result}
          </div>
        )}

      </div>
    </main>
  );
}
