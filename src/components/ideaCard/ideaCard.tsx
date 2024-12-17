import React from "react";
import { PiPlusCircleBold } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";

interface Note {
  content: string;
  dateCreated: string;
  importance: number;
  subnotes: Note[];
}

interface Idea {
  name: string;
  dateCreated: string;
  color?: string;
  notes: (Note | null)[];
}

function IdeaCard({ idea }: { idea: Idea }) {
  return (
    <div
      className={`w-full h-[250px] p-[15px] rounded-[20px]`}
      style={{
        backgroundColor: `#${idea.color}80`,
        border: `solid #${idea.color} 4px`,
      }}
    >
      <div className="flex justify-between items-center h-1/5 mb-4">
        <h1 className="text-3xl font-bold">{idea.name}</h1>{" "}
        <button className="text-5xl">
          <PiPlusCircleBold />
        </button>
      </div>
      <div className="flex flex-col gap-[6px] overflow-y-auto h-[73%]">
        <div className="bg-white rounded-[10px] flex justify-between p-3 items-center">
          <p className="font-semibold text-xl">This is a test note.</p>
          <button className="text-2xl text-green-600">
            <FaCheck />
          </button>
        </div>
      </div>
    </div>
  );
}

export default IdeaCard;
