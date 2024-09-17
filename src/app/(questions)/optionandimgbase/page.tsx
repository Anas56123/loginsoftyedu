import { Checkbox, Input } from "antd";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import DragAndDrop from "@/../public/uploader.svg";
export default function Home() {
  return (
    <div>
      <div className="flex h-full items-center gap-5">
        <ArrowLeft className="font-light" />
        <h1 className="text-3xl font-bold text-[#778BAA]">Create questions</h1>
      </div>
      <div className="flex flex-col gap-8 items-center">
        <Input
          placeholder="Untitled"
          className="mt-10 text-4xl font-bold text-center"
          bordered={false}
        />
        <div className="flex gap-4 items-center">
          <Image
            src={DragAndDrop}
            alt="question-img-base"
            width={300}
            height={300}
          />
          <div className="flex flex-col gap-4 w-80">
            <div className="question-shadow-and-border-me flex-1 rounded-lg flex items-center justify-between py-1 px-2">
              <Input placeholder="Option 1" bordered={false} />
              <Checkbox />
            </div>
            <div className="question-shadow-and-border-me flex-1 rounded-lg flex items-center justify-between py-1 px-2">
              <Input placeholder="Option 2" bordered={false} />
              <Checkbox />
            </div>
            <div className="question-shadow-and-border-me flex-1 rounded-lg flex items-center justify-between py-1 px-2">
              <Input placeholder="Option 3" bordered={false} />
              <Checkbox />
            </div>
            <div className="question-shadow-and-border-me flex-1 rounded-lg flex items-center justify-between py-1 px-2">
              <Input placeholder="Option 4" bordered={false} />
              <Checkbox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
