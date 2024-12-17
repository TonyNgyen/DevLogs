import React from "react";
import IdeaCard from "../ideaCard/ideaCard";

const ideas = [
  { name: "Idea Name", dateCreated: "12/15/2024", color: "F0A0A0", notes: [] },
  { name: "Idea Name", dateCreated: "12/15/2024", color: "CCA8FF", notes: [] },
];

function CardContainer() {
  return (
    <div className="flex flex-col gap-3">
      {ideas.map((idea, index) => (
        <IdeaCard key={index} idea={idea} />
      ))}
    </div>
  );
}

export default CardContainer;
