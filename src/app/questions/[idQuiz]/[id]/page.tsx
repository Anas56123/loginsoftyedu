"use client";
import ImgBase from "@/Components/ImgBase";
import OptionAndImgBase from "@/Components/OptionAndImgBase";
import OptionBase from "@/Components/OptionBase";
import { Button } from "antd";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

type Question = {
  id: string;
  title: string;
  options: string[];
  type: "option" | "img" | "option-and-img";
  correctAnswer: string;
};
export default function Questions() {
  const [questions, setQuestions] = useState<Question>({
    id: "1",
    title: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    type: "option",
    correctAnswer: "Paris",
  });

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div className="w-full p-4">
        <div className="w-full mt-10">
          <div className="flex h-full items-center gap-5 ml-96">
            <ArrowLeft className="font-light" />
            <h1 className="text-3xl font-bold text-[#778BAA]">
              Create questions
            </h1>
          </div>
          <div className="flex">
            <aside className="w-1/5 h-full flex flex-col justify-center flex-[0.2]">
              <div className="border-[1px] border-[#C2DFFB] rounded-lg p-4 bg-[#F5FAFF] flex flex-col gap-5">
                <div>
                  <h5 className="text-sm font-bold">Question</h5>
                </div>
                <Button
                  size="large"
                  className="w-full font-semibold"
                  type="primary"
                >
                  Add a question
                </Button>
              </div>
            </aside>
            <div className="w-full h-full flex flex-[0.8] gap-10 mt-10">
              {questions?.type === "option" ? (
                <div className="w-[100%] flex-1 flex flex-col items-center">
                  <OptionBase />
                </div>
              ) : null}
              {questions?.type === "img" ? <ImgBase /> : null}
              {questions?.type === "option-and-img" ? (
                <OptionAndImgBase />
              ) : null}
            </div>
            <aside className="w-1/5 h-full flex-[0.2]">
              <div className="border-[1px] border-[#C2DFFB] rounded-lg p-4 bg-[#F5FAFF]">
                <h1>Question</h1>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
