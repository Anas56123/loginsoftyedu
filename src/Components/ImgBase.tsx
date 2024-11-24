"use client";
import { Button, Checkbox, Input } from "antd";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import DragAndDrop from "@/../public/uploader.svg";
import { useState } from "react";

export default function ImgBase() {
  const [correctAnswer, setCorrectAnswer] = useState<"A" | "B">("A");

  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <Input
          placeholder="Untitled"
          size="large"
          className="text-4xl font-bold text-center"
          bordered={false}
        />
        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-4">
            <Image
              src={DragAndDrop}
              alt="question-img-base"
              width={400}
              height={400}
            />
            <div className="flex flex-col gap-2 items-center">
              <div className="border-2 border-[#D6DAE1] w-10 h-10 rounded-lg p-2 flex items-center justify-center">
                A
              </div>
              <Checkbox
                checked={correctAnswer === "A"}
                onChange={() => setCorrectAnswer("A")}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Image
              src={DragAndDrop}
              alt="question-img-base"
              width={400}
              height={400}
            />
            <div className="flex flex-col gap-2 items-center">
              <div className="border-2 border-[#D6DAE1] w-10 h-10 rounded-lg p-2 flex items-center justify-center">
                B
              </div>
              <Checkbox
                checked={correctAnswer === "B"}
                onChange={() => setCorrectAnswer("B")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
