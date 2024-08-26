"use client";
import { useState } from "react";
import TableComponent from "@/Components/Table";
import { Button } from "antd";
import { FileDown, FileUp } from "lucide-react";

export default function Home() {
  const [data, setData] = useState([]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-6 h-12">
            <h1 className="text-3xl font-semibold">Students List</h1>
            <span className="border border-[#6941C6] bg-[#F9F5FF] rounded-full py-1 px-3 font-medium text-[#6941C6] shadow-md shadow-violet-200">
              {data?.length} Students
            </span>
          </div>
          <p className="font-light">
            Check out the latest updates from your students
          </p>
        </div>
        <div className="flex items-end gap-2">
        <Button
            className="bg-white text-[#647fa8] border border-[#647fa8] hover:!bg-white hover:!text-[#4096ff] hover:!border-[#4096ff] w-28 h-11"
            type="primary"
            size='large'
            icon={<FileUp size={20} />}
          >
            Import
          </Button>
          <Button
            className="bg-white text-[#647fa8] border border-[#647fa8] hover:!bg-white hover:!text-[#4096ff] hover:!border-[#4096ff] w-28 h-11"
            type="primary"
            size='large'
            icon={<FileDown size={20} />}
          >
            Export
          </Button>
        </div>
      </div>
      <br />
      <div>
        <TableComponent />
      </div>
    </div>
  );
}
