"use client";

import React, { useState } from "react";
import {
  PiPlusCircleBold,
  PiCheckCircleBold,
  PiXCircleBold,
} from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/app/firebase";
import { makeid } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface Note {
  id: string;
  content: string;
  importance: number;
  subnotes: Note[];
}

interface Idea {
  id: string;
  name: string;
  createdAt: string;
  borderColor?: string;
  fillColor?: string;
  notes: (Note | null)[];
}

function IdeaCard({ idea }: { idea: Idea }) {
  const [addMode, setAddMode] = useState(false);
  const [settingsPopup, setSettingsPopup] = useState(false);
  const [nameChange, setNameChange] = useState(false);
  const [ideaName, setIdeaName] = useState(idea.name);
  const [colorChange, setColorChange] = useState(false);
  const [borderColor, setBorderColor] = useState(idea.borderColor);
  const [fillColor, setFillColor] = useState(idea.fillColor);
  const [noteContent, setNoteContent] = useState("");
  const [emptyNoteError, setEmptyNoteError] = useState(false);
  const [importance, setImportance] = useState(2);

  const importanceStyles =
    "w-1/3 h-[30px] flex justify-center items-center font-semibold text-lg bg-gray-200 border-2 border-black";
  const user = auth.currentUser;
  const colorOptions = {
    FF7EA1: "FFBED0",
    FF9090: "FFC7C7",
    FFA656: "FFD2AA",
    FFD55E: "FFEAAE",
    "61CA68": "AFE4B3",
    "7BC7FF": "BCE3FF",
    CCA8FF: "E5D3FF",
    "000000": "FFFFFF",
    custom: "custom",
  };

  const addNote = async () => {
    if (!user?.uid) {
      return;
    }
    try {
      if (noteContent == "") {
        setEmptyNoteError(true);
        return;
      }
      const noteId = makeid();
      const docRef = doc(db, "users", user?.uid, "ideas", idea.id);
      await updateDoc(docRef, {
        notes: arrayUnion({
          id: noteId,
          content: noteContent,
          importance: importance,
          subnotes: [],
        }),
      });
      console.log("Value successfully added to array!");
      setImportance(2);
      setNoteContent("");
      setAddMode(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const removeNote = async (noteToRemove: Note | null) => {
    if (!user?.uid || !idea.id) {
      console.error("User or idea ID is missing.");
      return;
    }
    try {
      const docRef = doc(db, "users", user?.uid, "ideas", idea.id);
      await updateDoc(docRef, {
        notes: arrayRemove(noteToRemove),
      });
      console.log("Note removed successfully!");
    } catch (error) {
      console.error("Error removing note:", error);
    }
  };

  const changeName = async () => {
    if (!user?.uid) {
      return;
    }
    try {
      const docRef = doc(db, "users", user?.uid, "ideas", idea.id);
      await updateDoc(docRef, {
        name: ideaName,
      });
      console.log("Idea name successfully changed!");
      setNameChange(false);
    } catch (error) {
      console.error("Error changing idea name:", error);
    }
  };

  const changeColor = async () => {
    if (!user?.uid) {
      return;
    }
    try {
      const docRef = doc(db, "users", user?.uid, "ideas", idea.id);
      await updateDoc(docRef, {
        borderColor: borderColor,
        fillColor: fillColor,
      });
      console.log("Idea color successfully changed!");
      setColorChange(false);
    } catch (error) {
      console.error("Error changing idea color:", error);
    }
  };

  const deleteIdea = async () => {
    if (!user?.uid || !idea.id) {
      console.error("User or idea ID is missing.");
      return;
    }
    try {
      const docRef = doc(db, "users", user?.uid, "ideas", idea.id);
      await deleteDoc(docRef);
      console.log("Idea removed successfully!");
    } catch (error) {
      console.error("Error removing idea:", error);
    }
  };

  const getBorderColor = (importance: number | undefined) => {
    if (borderColor?.toUpperCase() !== "000000") {
      if (importance === 1) return `#BDBDBD`;
      if (importance === 2) return `#${borderColor}BF`;
      return `#${borderColor}FF`;
    } else {
      if (importance === 1) return "#E2E2E2";
      if (importance === 2) return "#BDBDBD";
      return "#9A9A9A";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`w-full h-[285px] p-[15px] rounded-[20px] lg:w-fill lg:h-[370px]`}
      style={{
        backgroundColor: `#${addMode ? `FFFFFF` : `${fillColor}`}`,
        border: `solid #${borderColor} 4px`,
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <AnimatePresence initial={false}>
          {nameChange ? (
            <div className="w-full relative">
              <input
                type="text"
                name="ideaName"
                placeholder="Idea Name"
                className="text-3xl font-bold bg-transparent w-full"
                value={ideaName}
                onChange={(e) => setIdeaName(e.target.value)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bg-black h-[3px] w-full"
              ></motion.div>
            </div>
          ) : (
            <h1 className="text-3xl font-bold">
              {addMode ? "New Note?" : idea.name}
            </h1>
          )}
        </AnimatePresence>

        {addMode ? (
          <div className="flex">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-5xl text-red-600"
              onClick={() => {
                setImportance(2);
                setNoteContent("");
                setAddMode(false);
                setEmptyNoteError(false);
              }}
            >
              <PiXCircleBold />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-5xl text-green-600 "
              onClick={() => {
                addNote();
              }}
            >
              <PiCheckCircleBold />
            </motion.button>
          </div>
        ) : nameChange ? (
          <div className="flex gap-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-5xl text-red-600"
              onClick={() => {
                setNameChange(false);
                setIdeaName(idea.name);
              }}
            >
              <PiXCircleBold />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-5xl text-green-600 "
              onClick={() => {
                changeName();
              }}
            >
              <PiCheckCircleBold />
            </motion.button>
          </div>
        ) : colorChange ? (
          <div className="flex gap-0">
            <div className="relative flex">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-5xl text-red-600"
                onClick={() => {
                  setColorChange(false);
                  setBorderColor(idea.borderColor);
                }}
              >
                <PiXCircleBold />
              </motion.button>
              <AnimatePresence initial={false}>
                {colorChange && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute bg-white w-44 right-0 top-[3.2rem] rounded-lg border-black border-[3px] z-20 grid grid-cols-3 grid-rows-3 gap-2 p-2"
                    style={{ boxShadow: "4px 4px black" }}
                  >
                    {Object.keys(colorOptions).map(
                      (color) => {
                        if (color == "custom") {
                          return (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="w-fill aspect-square border-[3px] border-black rounded-lg bg-red-200"
                              onClick={() => {
                                setBorderColor(color);
                                setFillColor(
                                  colorOptions[
                                    color as keyof typeof colorOptions
                                  ]
                                );
                              }}
                              key={color}
                            ></motion.button>
                          );
                        } else if (color == "000000") {
                          return (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="w-fill aspect-square border-[3px] border-black rounded-lg bg-white"
                              onClick={() => {
                                setBorderColor(color);
                                setFillColor(
                                  colorOptions[
                                    color as keyof typeof colorOptions
                                  ]
                                );
                              }}
                              key={color}
                            ></motion.button>
                          );
                        } else {
                          return (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="w-full aspect-square rounded-lg"
                              style={{
                                backgroundColor: `#${
                                  colorOptions[
                                    color as keyof typeof colorOptions
                                  ]
                                }`,
                                border: `solid #${color} 3px`,
                              }}
                              onClick={() => {
                                setBorderColor(color);
                                setFillColor(
                                  colorOptions[
                                    color as keyof typeof colorOptions
                                  ]
                                );
                              }}
                              key={color}
                            ></motion.button>
                          );
                        }
                      }
                      // color != "000000" ? (
                      // <motion.button
                      //   whileHover={{ scale: 1.1 }}
                      //   whileTap={{ scale: 0.95 }}
                      //   initial={{ opacity: 0, scale: 0 }}
                      //   animate={{ opacity: 1, scale: 1 }}
                      //   className="w-fill aspect-square rounded-lg"
                      //   style={{
                      //     backgroundColor: `#${
                      //       colorOptions[color as keyof typeof colorOptions]
                      //     }`,
                      //     border: `solid #${color} 3px`,
                      //   }}
                      //   onClick={() => {
                      //     setBorderColor(color);
                      //     setFillColor(
                      //       colorOptions[color as keyof typeof colorOptions]
                      //     );
                      //   }}
                      //   key={color}
                      // ></motion.button>
                      // ) : (
                      // <motion.button
                      //   whileHover={{ scale: 1.1 }}
                      //   whileTap={{ scale: 0.95 }}
                      //   initial={{ opacity: 0, scale: 0 }}
                      //   animate={{ opacity: 1, scale: 1 }}
                      //   className="w-fill aspect-square border-[3px] border-black rounded-lg bg-white"
                      //   onClick={() => {
                      //     setBorderColor(color);
                      //     setFillColor(
                      //       colorOptions[color as keyof typeof colorOptions]
                      //     );
                      //   }}
                      //   key={color}
                      // ></motion.button>
                      // )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-5xl text-green-600 "
              onClick={() => {
                changeColor();
              }}
            >
              <PiCheckCircleBold />
            </motion.button>
          </div>
        ) : (
          <div className="flex gap-0">
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-5xl flex justify-center items-center w-10 z-0"
                onClick={() => setSettingsPopup(!settingsPopup)}
              >
                <BsThreeDotsVertical />
              </motion.button>
              <AnimatePresence initial={false}>
                {settingsPopup && (
                  <motion.ul
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute bg-white w-48 right-0 rounded-lg border-black border-[3px] z-20 overflow-hidden"
                    style={{ boxShadow: "4px 4px black" }}
                  >
                    <li
                      className="text-2xl text-right p-2 hover:bg-gray-300 font-semibold border-b-2 border-black cursor-pointer"
                      onClick={() => {
                        setNameChange(true);
                        setSettingsPopup(false);
                      }}
                    >
                      Change Name
                    </li>
                    <li
                      className="text-2xl text-right p-2 hover:bg-gray-300 font-semibold border-b-2 border-black cursor-pointer"
                      onClick={() => {
                        setColorChange(true);
                        setSettingsPopup(false);
                      }}
                    >
                      Change Color
                    </li>
                    <li
                      className="text-2xl text-right p-2 font-semibold text-red-600 hover:text-white hover:bg-red-600 cursor-pointer"
                      onClick={() => {
                        deleteIdea();
                        setSettingsPopup(false);
                      }}
                    >
                      Delete Idea
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-5xl "
              onClick={() => setAddMode(true)}
            >
              <PiPlusCircleBold />
            </motion.button>
          </div>
        )}
      </div>
      <div className=" overflow-y-auto h-[73%]">
        <AnimatePresence initial={false}>
          {addMode ? (
            <form className="flex flex-col gap-2 h-full">
              <motion.textarea
                whileTap={{ scale: 0.98 }}
                rows={2}
                className={`border-[2px] flex-grow rounded-lg p-3 w-full font-bold text-lg ${
                  emptyNoteError
                    ? " border-red-600 placeholder-red-600"
                    : " border-black "
                }`}
                placeholder={`${
                  emptyNoteError
                    ? "Please write a new note!"
                    : "What's your new note?"
                }`}
                value={noteContent}
                onChange={(e) => {
                  setNoteContent(e.target.value);
                  setEmptyNoteError(false);
                }}
              />
              <div>
                {" "}
                <h2 className="text-2xl font-semibold">Importance</h2>
                <div className="flex">
                  <button
                    type="button"
                    className={`${importanceStyles} rounded-l-lg`}
                    style={{
                      background:
                        importance == 1
                          ? `#${borderColor}80`
                          : "rgb(229 231 235)",
                      border: `${
                        borderColor == "000000"
                          ? " solid 2px black "
                          : importance == 1
                          ? ` none `
                          : " solid 2px black "
                      }`,
                    }}
                    onClick={() => setImportance(1)}
                  >
                    Low
                  </button>
                  <button
                    type="button"
                    className={`${importanceStyles} `}
                    style={{
                      background:
                        importance == 2
                          ? `#${borderColor}BF`
                          : "rgb(229 231 235)",
                      border: `${
                        borderColor == "000000"
                          ? " solid 2px black "
                          : importance == 2
                          ? ` none `
                          : "solid 2px black "
                      }`,
                    }}
                    onClick={() => setImportance(2)}
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    className={`${importanceStyles} rounded-r-lg`}
                    style={{
                      background:
                        importance == 3
                          ? `#${borderColor}FF`
                          : "rgb(229 231 235)",
                      border: `${
                        borderColor == "000000"
                          ? " solid 2px black "
                          : importance == 3
                          ? ` none `
                          : " solid 2px black "
                      }`,
                    }}
                    onClick={() => setImportance(3)}
                  >
                    High
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-[6px]">
              <AnimatePresence initial={false}>
                {idea.notes.map((note) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="bg-white rounded-[10px] flex justify-between p-3 items-center"
                    key={note?.id}
                    style={{
                      borderLeft: `solid 7px ${getBorderColor(
                        note?.importance
                      )}`,
                      boxShadow:
                        borderColor === "000000"
                          ? "inset 0px 0px 0px 1px #C2C2C2"
                          : "none",
                    }}
                  >
                    <p className="font-semibold text-xl">{note?.content}</p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-2xl text-green-600"
                      onClick={() => {
                        removeNote(note);
                        setSettingsPopup(false);
                      }}
                    >
                      <FaCheck />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default IdeaCard;
