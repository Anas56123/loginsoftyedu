"use client";
import Image from "next/image";
import { useState } from "react";
import IB from "@/../public/Import button.png";
import EB from "@/../public/Export button.png";
import TableComponent from "@/Components/Table";

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
            <button><Image src={IB} alt="" /></button>
            <button><Image src={EB} alt="" /></button>
        </div>
      </div>
      <br />
      <div>
        <TableComponent />
      </div>
    </div>
  );
}
