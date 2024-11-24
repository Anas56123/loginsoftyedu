"use client";
import { Checkbox, Input } from "antd";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import DragAndDrop from "@/../public/uploader.svg";
import { useState } from "react";

export default function OptionAndImgBase() {
  const [correctAnswer, setCorrectAnswer] = useState<"Option 1" | "Option 2" | "Option 3" | "Option 4">("Option 1");

  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <Input
          placeholder="Untitled"
          size="large"
          className="mt-10 text-4xl font-bold text-center"
          bordered={false}
        />
        <div className="flex gap-4 w-1/2 items-center">
          <Image
            src={DragAndDrop}
            alt="question-img-base"
            className="flex-[0.5]"
            width={300}
            height={300}
          />
          <div className="flex flex-col gap-4 w-80 flex-[0.5]">
            <div className="question-shadow-and-border-me flex-1 rounded-lg flex items-center justify-between py-1 px-2">
              <Input size="large" placeholder="Option 1" bordered={false} />
              <Checkbox checked={correctAnswer === "Option 1"} onChange={() => setCorrectAnswer("Option 1")} />
            </div>
            <div className="question-shadow-and-border-me flex-1 rounded-lg flex items-center justify-between py-1 px-2">
              <Input size="large" placeholder="Option 2" bordered={false} />
              <Checkbox checked={correctAnswer === "Option 2"} onChange={() => setCorrectAnswer("Option 2")} />
            </div>
            <div className="question-shadow-and-border-me flex-1 rounded-lg flex items-center justify-between py-1 px-2">
              <Input size="large" placeholder="Option 3" bordered={false} />
              <Checkbox checked={correctAnswer === "Option 3"} onChange={() => setCorrectAnswer("Option 3")} />
            </div>
            <div className="question-shadow-and-border-me flex-1 rounded-lg flex items-center justify-between py-1 px-2">
              <Input size="large" placeholder="Option 4" bordered={false} />
              <Checkbox checked={correctAnswer === "Option 4"} onChange={() => setCorrectAnswer("Option 4")} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
