import { Checkbox, Input } from "antd";
import { ArrowLeft } from "lucide-react";

export default function Home() {
  return (
    <div>
      <div className="flex h-full items-center gap-5">
        <ArrowLeft className="font-light" />
        <h1 className="text-3xl font-bold text-[#778BAA]">Create questions</h1>
      </div>
      <div className="flex flex-col gap-3 items-center">
        <Input
          placeholder="Untitled"
          className="mt-10 mb-3 text-4xl font-bold text-center"
          bordered={false}
        />
        <div className="flex gap-2 w-3/4">
          <div className="question-shadow-and-border-me flex-1 rounded-lg flex items-center justify-between py-1 px-2">
            <Input placeholder="Option 1" bordered={false} />
            <Checkbox />
          </div>
          <div className="question-shadow-and-border-me flex-1 rounded-lg flex items-center justify-between py-1 px-2">
            <Input placeholder="Option 2" bordered={false} />
            <Checkbox />
          </div>
        </div>
        <div className="flex gap-2 w-3/4">
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
  );
}
