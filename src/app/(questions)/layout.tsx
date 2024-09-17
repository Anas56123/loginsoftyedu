import { ReactNode } from "react";
import Image from "next/image";
import SoftyEduLogo from "@/../public/SoftyEduLogo.svg";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex justify-between items-center">
        <aside className="w-1/5 h-full">
          <Image
            height="130"
            width="130"
            src={SoftyEduLogo}
            alt="Logo"
          />
          <div className="border-[1px] border-[#C2DFFB] rounded-lg p-4 bg-[#F5FAFF]">
            <h1>Question</h1>
          </div>
        </aside>
        <div className="h-screen w-full mt-10">{children}</div>
      </div>
    </div>
  );
}
