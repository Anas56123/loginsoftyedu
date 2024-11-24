"use client";
import React, { useState } from "react";
import { Button } from "antd";
import Image from "next/image";
import ImgBase from "@/../public/imgBase.svg";
import OptionAndImgBase from "@/../public/optionAndImgBase.svg";
import OptionBase from "@/../public/optionBase.svg";
import { insertQuestions } from "@/Data/INSERT/insertQuestions";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

function Home() {
  const [selectedType, setSelectedType] = useState<
    "" | "img" | "option_and_img" | "option"
  >("");
  const router = useRouter();
  const { idQuiz } = useParams<{ idQuiz: string }>();
  return (
    <div className="flex flex-col w-full h-full gap-10 justify-center">
      <h1 className="text-4xl font-bold text-center text-gray-600">
        Create questions
      </h1>
      <div className="flex flex-col items-center gap-5">
        <div className="w-2/3 flex justify-center gap-16">
          <Button
            className={`w-[300px] h-[300px] p-6 rounded-xl ${
              selectedType === "img" ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => setSelectedType("img")}
            size="large"
          >
            <Image
              src={ImgBase}
              alt="question"
              width={100}
              height={100}
              className="w-full h-full"
            />
          </Button>
          <Button
            className={`w-[300px] h-[300px] p-6 rounded-xl ${
              selectedType === "option_and_img"
                ? "border-2 border-blue-500"
                : ""
            }`}
            onClick={() => setSelectedType("option_and_img")}
            size="large"
          >
            <Image
              src={OptionAndImgBase}
              alt="question"
              width={100}
              height={100}
              className="w-full h-full"
            />
          </Button>
          <Button
            className={`w-[300px] h-[300px] p-6 rounded-xl ${
              selectedType === "option" ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => setSelectedType("option")}
            size="large"
          >
            <Image
              src={OptionBase}
              alt="question"
              width={100}
              height={100}
              className="w-full h-full"
            />
          </Button>
        </div>
        <Button
          type="primary"
          size="large"
          onClick={async () => {
            if (selectedType) {
              const success = await insertQuestions(selectedType, idQuiz);
              console.log(success);
              if (success) {
                router.push(`/questions/${idQuiz}/${success[0].id}`);
              }
            }
          }}
        >
          Add a question
        </Button>
      </div>
    </div>
  );
}

export default Home;
