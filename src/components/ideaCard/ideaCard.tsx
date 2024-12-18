"use client";

import React, { useState } from "react";
import {
  PiPlusCircleBold,
  PiCheckCircleBold,
  PiXCircleBold,
} from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { makeid } from "@/lib/utils";
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
  const [noteContent, setNoteContent] = useState("");
  const [emptyNoteError, setEmptyNoteError] = useState(false);
  const [importance, setImportance] = useState(2);
  const importanceStyles =
    "w-1/3 h-[30px] flex justify-center items-center font-semibold text-lg bg-gray-200 border-2 border-black";

  const addNote = async () => {
    try {
      if (noteContent == "") {
        setEmptyNoteError(true);
        return;
      }
      const noteId = makeid();
      const date = format(new Date(), "P");
      const docRef = doc(db, "ideas", idea.id);
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

  return (
    <div
      className={`w-full h-[250px] p-[15px] rounded-[20px]`}
      style={{
        backgroundColor: `#${addMode ? `FFFFFF` : `${idea.color}80`}`,
        border: `solid #${idea.color} 4px`,
      }}
    >
      <div className="flex justify-between items-center h-1/5 mb-4 ">
        <h1 className="text-3xl font-bold">
          {addMode ? "New Note?" : idea.name}
        </h1>
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
            </button>{" "}
            <button
              className="text-5xl text-green-600 "
              onClick={() => {
                addNote();
              }}
            >
              <PiCheckCircleBold />
            </button>
          </div>
        ) : (
          <button className="text-5xl" onClick={() => setAddMode(true)}>
            <PiPlusCircleBold />
          </button>
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
                    importance == 1 ? `#${idea.color}80` : "rgb(229 231 235)",
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
                    importance == 2 ? `#${idea.color}BF` : "rgb(229 231 235)",
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
                    importance == 3 ? `#${idea.color}FF` : "rgb(229 231 235)",
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
            >
              <p className="font-semibold text-xl">{note?.content}</p>
              <button className="text-2xl text-green-600">
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
