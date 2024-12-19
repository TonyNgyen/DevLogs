"use client";

import React, { useState } from "react";
import {
  PiPlusCircleBold,
  PiCheckCircleBold,
  PiXCircleBold,
  PiGearBold,
} from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/app/firebase";
import { makeid, toGrayscale } from "@/lib/utils";
import { format } from "date-fns";

interface Note {
  id: number;
  content: string;
  dateCreated: string;
  importance: number;
  subnotes: Note[];
}

interface Idea {
  id: string;
  name: string;
  dateCreated: string;
  color?: string;
  notes: (Note | null)[];
}

function IdeaCard({ idea }: { idea: Idea }) {
  const [addMode, setAddMode] = useState(false);
  const [settingsPopup, setSettingsPopup] = useState(false);
  const [nameChange, setNameChange] = useState(false);
  const [ideaName, setIdeaName] = useState(idea.name);
  const [colorChange, setColorChange] = useState(false);
  const [ideaColor, setIdeaColor] = useState(idea.color);
  const [noteContent, setNoteContent] = useState("");
  const [emptyNoteError, setEmptyNoteError] = useState(false);
  const [importance, setImportance] = useState(2);

  const importanceStyles =
    "w-1/3 h-[30px] flex justify-center items-center font-semibold text-lg bg-gray-200 border-2 border-black";
  const user = auth.currentUser;
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
      const date = format(new Date(), "P");
      const docRef = doc(db, "users", user?.uid, "ideas", idea.id);
      await updateDoc(docRef, {
        notes: arrayUnion({
          id: noteId,
          content: noteContent,
          dateCreated: date,
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
    } catch (error) {}
  };

  const changeColor = async () => {
    if (!user?.uid) {
      return;
    }
    try {
      const docRef = doc(db, "users", user?.uid, "ideas", idea.id);
      await updateDoc(docRef, {
        color: ideaColor,
      });
      console.log("Idea color successfully changed!");
      setColorChange(false);
    } catch (error) {}
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
      console.error("Error removing note:", error);
    }
  };

  return (
    <div
      className={`w-full h-[250px] p-[15px] rounded-[20px]`}
      style={{
        backgroundColor: `#${addMode ? `FFFFFF` : `${ideaColor}80`}`,
        border: `solid #${ideaColor} 4px`,
      }}
    >
      <div className="flex justify-between items-center h-1/5 mb-4 ">
        {nameChange ? (
          <input
            type="text"
            name="ideaName"
            placeholder="Idea Name"
            className="text-3xl font-bold border-b-[3px] border-black w-1/2 bg-transparent"
            value={ideaName}
            onChange={(e) => setIdeaName(e.target.value)}
          />
        ) : (
          <h1 className="text-3xl font-bold">
            {addMode ? "New Note?" : idea.name}
          </h1>
        )}

        {addMode ? (
          <div className="flex">
            <button
              className="text-5xl text-red-600"
              onClick={() => {
                setImportance(2);
                setNoteContent("");
                setAddMode(false);
                setEmptyNoteError(false);
              }}
            >
              <PiXCircleBold />
            </button>
            <button
              className="text-5xl text-green-600 "
              onClick={() => {
                addNote();
              }}
            >
              <PiCheckCircleBold />
            </button>
          </div>
        ) : nameChange ? (
          <div className="flex gap-0">
            <button
              className="text-5xl text-red-600"
              onClick={() => {
                setNameChange(false);
                setIdeaName(idea.name);
              }}
            >
              <PiXCircleBold />
            </button>
            <button
              className="text-5xl text-green-600 "
              onClick={() => {
                changeName();
              }}
            >
              <PiCheckCircleBold />
            </button>
          </div>
        ) : colorChange ? (
          <div className="flex gap-0">
            <div className="relative">
              <button
                className="text-5xl text-red-600"
                onClick={() => {
                  setColorChange(false);
                  setIdeaColor(idea.color);
                }}
              >
                <PiXCircleBold />
              </button>
              {colorChange && (
                <div
                  className="absolute bg-white w-44 right-0 top-[3.2rem] rounded-lg border-black border-[3px] z-20 grid grid-cols-3 grid-rows-3 gap-2 p-2"
                  style={{ boxShadow: "4px 4px black" }}
                >
                  {colorOptions.map((color) =>
                    color != "FFFFFF" ? (
                      <div
                        className="w-fill aspect-square rounded-lg"
                        style={{
                          backgroundColor: `white`,
                        }}
                        onClick={() => {
                          setIdeaColor(color);
                        }}
                        key={color}
                      >
                        <div
                          className="w-fill aspect-square rounded-lg"
                          style={{
                            backgroundColor: `#${color}80`,
                            border: `solid #${color} 3px`,
                          }}
                          onClick={() => {
                            setIdeaColor(color);
                          }}
                          key={color}
                        />
                      </div>
                    ) : (
                      <div
                        className="w-fill aspect-square border-[3px] border-black rounded-lg bg-white"
                        onClick={() => {
                          setIdeaColor(color);
                        }}
                        key={color}
                      />
                    )
                  )}
                </div>
              )}
            </div>

            <button
              className="text-5xl text-green-600 "
              onClick={() => {
                changeColor();
              }}
            >
              <PiCheckCircleBold />
            </button>
          </div>
        ) : (
          <div className="flex gap-0">
            <div className="relative">
              <button
                className="text-5xl flex justify-center items-center w-10 z-0"
                onClick={() => setSettingsPopup(!settingsPopup)}
              >
                <BsThreeDotsVertical />
              </button>
              {settingsPopup && (
                <ul
                  className="absolute bg-white w-48 right-0 rounded-lg border-black border-[3px] z-20 overflow-hidden"
                  style={{ boxShadow: "4px 4px black" }}
                >
                  <li
                    className="text-2xl text-right p-2 hover:text-gray-400 font-semibold border-b-2 border-black"
                    onClick={() => {
                      setNameChange(true);
                      setSettingsPopup(false);
                    }}
                  >
                    Change Name
                  </li>
                  <li
                    className="text-2xl text-right p-2 hover:text-gray-400 font-semibold border-b-2 border-black"
                    onClick={() => {
                      setColorChange(true);
                      setSettingsPopup(false);
                    }}
                  >
                    Change Color
                  </li>
                  <li
                    className="text-2xl text-right p-2 font-semibold text-red-600 hover:text-white hover:bg-red-600"
                    onClick={() => {
                      deleteIdea();
                      setSettingsPopup(false);
                    }}
                  >
                    Delete Idea
                  </li>
                </ul>
              )}
            </div>
            {/* <button className="text-4xl ">
            <FaGear />
          </button> */}

            <button className="text-5xl " onClick={() => setAddMode(true)}>
              <PiPlusCircleBold />
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[6px] overflow-y-auto h-[73%]">
        {addMode ? (
          <form>
            <textarea
              rows={2}
              className={`border-[2px] rounded-lg p-3 w-full font-bold text-lg ${
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

            <h2 className="text-2xl font-semibold">Importance</h2>
            <div className="flex">
              <div
                className={`${importanceStyles} rounded-l-lg`}
                style={{
                  background:
                    importance == 1 ? `#${ideaColor}80` : "rgb(229 231 235)",
                  border: `${importance == 1 ? ` none ` : " solid 2px black "}`,
                }}
                onClick={() => setImportance(1)}
              >
                Low
              </div>
              <div
                className={`${importanceStyles} `}
                style={{
                  background:
                    importance == 2 ? `#${ideaColor}BF` : "rgb(229 231 235)",
                  border: `${importance == 2 ? ` none ` : "solid 2px black "}`,
                }}
                onClick={() => setImportance(2)}
              >
                Medium
              </div>
              <div
                className={`${importanceStyles} rounded-r-lg`}
                style={{
                  background:
                    importance == 3 ? `#${ideaColor}FF` : "rgb(229 231 235)",
                  border: `${importance == 3 ? ` none ` : " solid 2px black "}`,
                }}
                onClick={() => setImportance(3)}
              >
                High
              </div>
            </div>
          </form>
        ) : (
          idea.notes.map((note, index) => (
            <div
              className="bg-white rounded-[10px] flex justify-between p-3 items-center"
              key={index}
              style={{
                borderLeft: `solid 4px ${
                  note?.importance == 1
                    ? ` #${toGrayscale(ideaColor ?? "000000")} `
                    : note?.importance == 2
                    ? ` #${ideaColor}BF `
                    : ` #${ideaColor}FF `
                }`,
              }}
            >
              <p className="font-semibold text-xl">{note?.content}</p>
              <button
                className="text-2xl text-green-600"
                onClick={() => removeNote(note)}
              >
                <FaCheck />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default IdeaCard;
