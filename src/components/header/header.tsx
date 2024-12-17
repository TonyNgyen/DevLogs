import React from "react";
import { PiPlusCircleBold } from "react-icons/pi";

function Header() {
  return (
    <div className="bg-[#9E9E9E] bg-opacity-30 border-[4px] border-[#9E9E9E] h-[96px] flex items-center justify-between px-[15px] rounded-[20px] mb-3">
      <h1 className="text-3xl font-bold">DevLogs</h1>
      <button className="text-5xl">
        <PiPlusCircleBold />
      </button>
    </div>
  );
}

export default Header;
