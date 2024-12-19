"use client";

import React, { useState } from "react";
import { PiPlusCircleBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { format } from "date-fns";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/app/firebase";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { makeid } from "@/lib/utils";

function Header() {
  const colorOptions = [
    "FF7EA1",
    "FF9090",
    "FFA656",
    "FFD55E",
    "61CA68",
    "7BC7FF",
    "CCA8FF",
    "FFFFFF",
  ];

  const [addPopup, setAddPopup] = useState(false);
  const [ideaPopUp, setIdeaPopup] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [selectedColor, setSelectedColor] = useState("FFFFFF");
  const [ideaName, setIdeaName] = useState("");

  const user = auth.currentUser;

  const addIdea = async () => {
    if (!user?.uid) {
      return;
    }
    try {
      const date = format(new Date(), "P");
      const docId = makeid();
      const docRef = doc(db, "users", user?.uid, "ideas", docId);
      await setDoc(docRef, {
        id: docId,
        name: ideaName,
        color: selectedColor,
        dateCreated: date,
        notes: [],
      });
      console.log(`Document created with ID: ${docId}`);
    } catch (error) {
      console.error("Error creating document: ", error);
    }
  };

  const coloredBorder = `solid #${
    selectedColor == "FFFFFF" ? `000000` : selectedColor
  } 3px`;

  return (
    <div className="bg-[#9E9E9E] bg-opacity-30 border-[4px] border-[#9E9E9E] h-[96px] flex items-center justify-between px-[15px] rounded-[20px] mb-3">
      <h1 className="text-4xl font-extrabold">DevLogs</h1>
      <div className="relative">
        <button className="text-5xl" onClick={() => setAddPopup(!addPopup)}>
          <PiPlusCircleBold />
        </button>
        {addPopup && (
          <ul
            className="absolute bg-white w-36 right-0 rounded-lg border-black border-[3px] z-10"
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
        <div className="w-[90vw] h-[45vh] bg-white rounded-[20px] absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3">
          <div
            className="w-[90vw] h-[45vh] rounded-[20px] absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 p-[15px]"
            style={{
              background: `#${selectedColor}80`,
              border: `solid #${
                selectedColor == "FFFFFF" ? `000000` : selectedColor
              } 5px`,
            }}
          >
            <div className="flex justify-between  mb-5">
              <h1 className="text-4xl font-bold ">New Idea?</h1>
              <button
                className="text-4xl self-start"
                onClick={() => {
                  setIdeaPopup(false);
                  setSelectedColor("FFFFFF");
                  setShowColors(false);
                }}
              >
                <IoClose />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-2xl font-semibold">Idea Name</label>
                <input
                  type="text"
                  name="ideaName"
                  placeholder="Name"
                  className="px-3 py-2 rounded-lg border-[3px] border-black text-2xl font-bold"
                  onChange={(e) => setIdeaName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1 h-36">
                <h2 className="text-2xl font-semibold">Pick a Color</h2>
                <div
                  className={`w-[50px] h-[50px] rounded-lg bg-white ${
                    !showColors ? " block " : " hidden "
                  }`}
                >
                  <div
                    className={`w-[50px] h-[50px] border-[3px] border-black rounded-lg ${
                      !showColors ? " block " : " hidden "
                    }`}
                    style={{
                      backgroundColor: `#${selectedColor}80`,
                      border: coloredBorder,
                    }}
                    onClick={() => setShowColors(true)}
                  />
                </div>
                <div
                  className={`flex flex-wrap gap-2 ${
                    showColors ? " block " : " hidden "
                  }`}
                >
                  <div
                    className="w-[50px] h-[50px] rounded-lg"
                    style={{
                      backgroundColor: `white`,
                    }}
                    onClick={() => {
                      setShowColors(false);
                      setSelectedColor(selectedColor);
                    }}
                  >
                    <div
                      className="w-[50px] h-[50px] rounded-lg"
                      style={{
                        backgroundColor: `#${selectedColor}80`,
                        border: coloredBorder,
                      }}
                      onClick={() => {
                        setShowColors(false);
                        setSelectedColor(selectedColor);
                      }}
                    />
                  </div>
                  {colorOptions.map((color) =>
                    color != "FFFFFF" ? (
                      <div
                        className="w-[50px] h-[50px] rounded-lg"
                        style={{
                          backgroundColor: `white`,
                        }}
                        onClick={() => {
                          setShowColors(false);
                          setSelectedColor(color);
                        }}
                        key={color}
                      >
                        <div
                          className="w-[50px] h-[50px] rounded-lg"
                          style={{
                            backgroundColor: `#${color}80`,
                            border: `solid #${color} 3px`,
                          }}
                          onClick={() => {
                            setShowColors(false);
                            setSelectedColor(color);
                          }}
                          key={color}
                        />
                      </div>
                    ) : (
                      <div
                        className="w-[50px] h-[50px] border-[3px] border-black rounded-lg bg-white"
                        onClick={() => {
                          setShowColors(false);
                          setSelectedColor(color);
                        }}
                        key={color}
                      />
                    )
                  )}
                </div>
              </div>
              <button
                className="bg-green-500 p-2 rounded-lg text-white text-xl font-bold border-green-700 border-[3px]"
                onClick={() => {
                  addIdea();
                  setIdeaPopup(false);
                  setSelectedColor("FFFFFF");
                  setShowColors(false);
                  setIdeaName("");
                }}
              >
                Add Idea
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
