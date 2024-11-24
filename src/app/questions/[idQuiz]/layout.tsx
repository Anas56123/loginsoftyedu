import { Button, Input } from "antd";
import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import SoftyEduLogo from "@/../public/SoftyEduLogo.svg";
import ProfileIcon from "@/../public/DUPP.svg";

function QuestionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="w-full flex items-center justify-between p-3">
        <Image src={SoftyEduLogo} alt="SoftyEduLogo" width={125} height={125} />
        <Input
          size="large"
          prefix={<Search />}
          placeholder="Search"
          className="w-1/3"
        />
        <div className="flex items-center gap-3">
          <Image
            src={NotificationIcon}
            alt="NotificationIcon"
            width={25}
            height={25}
          />
          <Button size="large" type="primary">
            Upgrade
          </Button>
          <Image src={ProfileIcon} alt="ProfileIcon" width={50} height={50} />
        </div>
      </header>
      <div className="w-full h-[calc(100vh-120px)]">{children}</div>
    </>
  );
}

export default QuestionsLayout;
