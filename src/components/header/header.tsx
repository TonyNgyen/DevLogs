"use client";

import React, { useState } from "react";
import { PiPlusCircleBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { auth, db } from "@/app/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { makeid } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { IoMenu } from "react-icons/io5";
import SignUpLoginForm from "../signUpLoginForm/signUpLoginForm";

function Header({ loggedIn }: { loggedIn: boolean }) {
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
  const [dropdown, setDropdown] = useState(false);
  const [authPopup, setAuthPopup] = useState(false);
  const [popUpVariant, setPopUpVariant] = useState(0);

  const user = auth.currentUser;

  const addIdea = async () => {
    if (!user?.uid) {
      return;
    }
    try {
      const docId = makeid();
      const docRef = doc(db, "users", user?.uid, "ideas", docId);
      await setDoc(docRef, {
        id: docId,
        name: ideaName,
        color: selectedColor,
        createdAt: serverTimestamp(),
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

  return loggedIn ? (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#9E9E9E] bg-opacity-30 border-[4px] border-[#9E9E9E] h-[96px] flex items-center justify-between px-[15px] rounded-[20px] mb-3"
    >
      <h1 className="text-4xl font-extrabold">DevLogs</h1>
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-5xl"
          onClick={() => setAddPopup(!addPopup)}
        >
          <PiPlusCircleBold />
        </motion.button>
        <AnimatePresence initial={false}>
          {addPopup && (
            <motion.ul
              className="absolute bg-white w-36 right-0 rounded-lg border-black border-[3px] z-10"
              style={{ boxShadow: "4px 4px black" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <li
                className="text-2xl text-right p-2 hover:text-gray-400 font-semibold border-b-2 border-black cursor-pointer"
                onClick={() => {
                  setIdeaPopup(true);
                  setAddPopup(false);
                }}
              >
                Add Idea
              </li>
              <li className="text-2xl text-right p-2 hover:text-gray-400 font-semibold cursor-pointer">
                Add Note
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence initial={false}>
        {ideaPopUp && (
          <div className="w-screen h-screen absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 z-40 flex justify-center items-center">
            <div className="absolute w-full h-full bg-black opacity-50"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
              className="w-[90vw] lg:w-[32vw] xl:w-[23vw] md:w-[80vw] min-h-[45vh] bg-white rounded-[20px] z-40"
            >
              <div
                className="w-[90vw] lg:w-[32vw] xl:w-[23vw] md:w-[80vw] min-h-[45vh] rounded-[20px] p-[15px] z-50"
                style={{
                  background: `#${selectedColor}80`,
                  border: `solid #${
                    selectedColor == "FFFFFF" ? `000000` : selectedColor
                  } 5px`,
                }}
              >
                <div className="flex justify-between mb-5">
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
                    <motion.input
                      whileTap={{ scale: 0.98 }}
                      type="text"
                      name="ideaName"
                      placeholder="Name"
                      className="px-3 py-2 rounded-lg border-[3px] border-black text-2xl font-bold"
                      onChange={(e) => setIdeaName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold">Pick a Color</h2>
                    <div
                      className={`min-h-[108px] ${
                        !showColors ? " block " : " hidden "
                      }`}
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-[50px] h-[50px] rounded-lg bg-white`}
                      >
                        <div
                          className={`w-[50px] h-[50px] border-[3px] border-black rounded-lg`}
                          style={{
                            backgroundColor: `#${selectedColor}80`,
                            border: coloredBorder,
                          }}
                          onClick={() => setShowColors(true)}
                        />
                      </motion.button>
                    </div>

                    {showColors && (
                      <div className={`flex flex-wrap gap-2 min-h-[108px]`}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
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
                        </motion.button>
                        {colorOptions.map((color) =>
                          color != "FFFFFF" ? (
                            <motion.button
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
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
                            </motion.button>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="w-[50px] h-[50px] border-[3px] border-black rounded-lg bg-white"
                              onClick={() => {
                                setShowColors(false);
                                setSelectedColor(color);
                              }}
                              key={color}
                            ></motion.button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
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
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  ) : (
    <div className="h-[96px]">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#9E9E9E] bg-opacity-30 border-[4px]  h-[96px] flex items-center justify-between px-[15px] mb-3 absolute top-0 left-0 w-screen"
      >
        <h1 className="text-4xl font-extrabold">DevLogs</h1>
        <div className="flex gap-4 items-center justify-center">
          <button
            className="text-xl sm:text-2xl border-[#CCA8FF] bg-[#E5D3FF] border-[3px] font-bold rounded-md py-1 px-3"
            onClick={() => {
              setDropdown(false);
              setPopUpVariant(1);
              setAuthPopup(true);
            }}
          >
            Sign Up
          </button>
          <div className="relative">
            <button
              className="text-5xl md:hidden flex"
              onClick={() => setDropdown(!dropdown)}
            >
              <IoMenu />
            </button>
            <AnimatePresence initial={false}>
              {dropdown && (
                <motion.ul
                  className="absolute bg-white w-36 right-0 rounded-lg border-black border-[3px] z-10"
                  style={{ boxShadow: "4px 4px black" }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <li
                    className="text-2xl text-right p-2 hover:text-gray-400 font-semibold border-b-2 border-black cursor-pointer"
                    onClick={() => {
                      setDropdown(false);
                      setPopUpVariant(0);
                      setAuthPopup(true);
                    }}
                  >
                    Log in
                  </li>
                  <li
                    className="text-2xl text-right p-2 hover:text-gray-400 font-semibold cursor-pointer"
                    onClick={() => {
                      setDropdown(false);
                      setPopUpVariant(1);
                      setAuthPopup(true);
                    }}
                  >
                    Sign up
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      <AnimatePresence initial={true}>
        {authPopup && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SignUpLoginForm
              setAuthPopup={setAuthPopup}
              setPopUpVariant={setPopUpVariant}
              popUpVariant={popUpVariant}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;
