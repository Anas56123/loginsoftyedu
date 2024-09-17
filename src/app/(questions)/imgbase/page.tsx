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
      <div className="w-full h-full flex justify-between items-center">
        <div className="flex flex-col gap-8 items-center">
          <Input
            placeholder="Untitled"
            className="mt-10 text-4xl font-bold text-center"
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
                <Checkbox />
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
                <Checkbox />
              </div>
            </div>
          </div>
        </div>
        <aside className="w-1/5 h-full">
          <div className="border-[1px] border-[#C2DFFB] rounded-lg p-4 bg-[#F5FAFF]">
            <h1>Question</h1>
          </div>
        </aside>
      </div>
    </div>
  );
}
