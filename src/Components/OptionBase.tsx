"use client";
import { Checkbox, Input } from "antd";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function OptionBase() {
  const [correctAnswer, setCorrectAnswer] = useState<
    "Option 1" | "Option 2" | "Option 3" | "Option 4"
  >("Option 1");

  return (
    <>
      <Input
        placeholder="Untitled"
        className="mt-10 mb-3 text-4xl font-bold text-center"
        bordered={false}
      />
      <div className="flex gap-2 w-3/4">
        <div className="question-shadow-and-border-me flex-1 rounded-lg flex items-center justify-between py-1 px-2">
          <Input size="large" placeholder="Option 1" bordered={false} />
          <Checkbox
            checked={correctAnswer === "Option 1"}
            onChange={() => setCorrectAnswer("Option 1")}
          />
        </div>
        <div className="question-shadow-and-border-me flex-1 rounded-lg flex items-center justify-between py-1 px-2">
          <Input size="large" placeholder="Option 2" bordered={false} />
          <Checkbox
            checked={correctAnswer === "Option 2"}
            onChange={() => setCorrectAnswer("Option 2")}
          />
        </div>
      </div>
      <div className="flex gap-2 w-3/4">
        <div className="question-shadow-and-border-me flex-1 rounded-lg flex items-center justify-between py-1 px-2">
          <Input size="large" placeholder="Option 3" bordered={false} />
          <Checkbox
            checked={correctAnswer === "Option 3"}
            onChange={() => setCorrectAnswer("Option 3")}
          />
        </div>
        <div className="question-shadow-and-border-me flex-1 rounded-lg flex items-center justify-between py-1 px-2">
          <Input size="large" placeholder="Option 4" bordered={false} />
          <Checkbox
            checked={correctAnswer === "Option 4"}
            onChange={() => setCorrectAnswer("Option 4")}
          />
        </div>
      </div>
    </>
  );
}
