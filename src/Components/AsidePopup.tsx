import { Button } from "antd";
import { X } from "lucide-react";
import { MouseEventHandler, ReactNode } from "react";

export default function AsidePopup({
  isOpen,
  setClose,
  children,
}: {
  isOpen: boolean;
  setClose: MouseEventHandler<HTMLElement> | undefined;
  children?: ReactNode;
}) {
  return (
    <>
      <div onClick={setClose} className={`${!isOpen ? "hidden" : "w-full h-full bg-[#6e6e6e80] absolute top-0 right-0 z-50"}`}></div>
      <div
        className={`${
          !isOpen
            ? "hidden"
            : "aside-w h-full absolute top-0 right-0 bg-white z-50 flex flex-col items-center"
        } `}
      >
        {children}
        <Button
          className="absolute border-0 top-0 right-0 bg-[#EEF1F6] hover:!bg-[#e1e4e9] text-[#667085] hover:!text-[#5b6477]"
          type="default"
          onClick={setClose}
          shape="circle"
          icon={<X size={16} />}
        />
      </div>
    </>
  );
}
