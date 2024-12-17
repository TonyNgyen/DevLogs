"use client";

import React, { useState } from "react";
import { PiPlusCircleBold } from "react-icons/pi";

function Header() {
  const colorOptions = [
    "FFFFFF",
    "FF7EA1",
    "FF9090",
    "FFA656",
    "FFD55E",
    "61CA68",
    "7BC7FF",
    "CCA8FF",
  ];

  const [addPopup, setAddPopup] = useState(false);
  const [ideaPopUp, setIdeaPopup] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [selectedColor, setSelectedColor] = useState("FFFFFF");
  return (
    <div className="bg-[#9E9E9E] bg-opacity-30 border-[4px] border-[#9E9E9E] h-[96px] flex items-center justify-between px-[15px] rounded-[20px] mb-3">
      <h1 className="text-3xl font-bold">DevLogs</h1>
      <div className="relative">
        <button className="text-5xl" onClick={() => setAddPopup(!addPopup)}>
          <PiPlusCircleBold />
        </button>
        {addPopup && (
          <ul
            className="absolute bg-white w-36 right-0 rounded-lg border-black border-[3px]"
            style={{ boxShadow: "4px 4px black" }}
          >
            <li
              className="text-2xl text-right p-2 hover:text-gray-400 font-semibold border-b-2 border-black"
              onClick={() => {
                setIdeaPopup(true);
                setAddPopup(false);
              }}
            >
              Add Idea
            </li>
            <li className="text-2xl text-right p-2 hover:text-gray-400 font-semibold">
              Add Note
            </li>
          </ul>
        )}
      </div>
      {ideaPopUp && (
        <div className="w-[90vw] h-[50vh] bg-white border-[5px] border-black rounded-[20px] absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 p-[15px]">
          <h1 className="text-4xl font-bold mb-5">New Idea?</h1>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-2xl font-semibold">Idea Name</label>
              <input
                type="text"
                name="ideaName"
                placeholder="Name"
                className="px-3 py-2 rounded-lg border-2 border-black text-xl"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-semibold">Pick a Color</h2>
              <div
                className={`w-[50px] h-[50px] border-4 border-black rounded-lg ${
                  !showColors ? " block " : " hidden "
                }`}
                onClick={() => setShowColors(true)}
              />
              <div
                className={`flex flex-wrap gap-2 ${
                  showColors ? " block " : " hidden "
                }`}
              >
                {colorOptions.map((color) =>
                  color != "FFFFFF" ? (
                    <div
                      className="w-[50px] h-[50px] rounded-lg"
                      style={{
                        backgroundColor: `#${color}80`,
                        border: `solid #${color} 4px`,
                      }}
                      onClick={() => setShowColors(false)}
                    />
                  ) : (
                    <div
                      className="w-[50px] h-[50px] border-4 border-black rounded-lg"
                      onClick={() => setShowColors(false)}
                    />
                  )
                )}
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Header;
