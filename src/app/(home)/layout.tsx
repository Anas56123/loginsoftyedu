import { ReactNode } from "react";
import Image from "next/image";
import SoftyEduLogo from "@/../public/SoftyEduLogo.svg";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div
        className={`transition-colors duration-300 bg-white flex`}
      >
        <aside className="transition-colors duration-300 bg-slate-50 px-4 flex w-80 flex-col items-center h-screen shadow-right-md">
          <br />
          <Image height="130" width="130" src={SoftyEduLogo} alt="Logo" />
          <br />
        </aside>
        <div className="transition-colors duration-300 w-screen">
          <header className="transition-colors duration-300 bg-white h-14 w-full flex justify-end items-center px-16 shadow-right-md">
          </header>
          <div className="transition-colors duration-300 scroll-smooth overflow-auto px-8 py-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
