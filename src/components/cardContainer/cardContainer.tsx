"use client";

import React, { useEffect, useState } from "react";
import IdeaCard from "../ideaCard/ideaCard";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase";

// const ideas = [
//   { name: "Idea Name", dateCreated: "12/15/2024", color: "FF9090", notes: [] },
//   { name: "Idea Name", dateCreated: "12/15/2024", color: "CCA8FF", notes: [] },
// ];

interface Note {
  id: number;
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

function CardContainer() {
  const [ideas, setIdeas] = useState<Idea[] | null>();
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "ideas"),
      (snapshot) => {
        const ideaArray: Idea[] = snapshot.docs.map(
          (doc) => doc.data() as Idea
        );
        setIdeas(ideaArray);
      }
    );
    return () => unsubscribe();
  }, []);
  return (
    <div className="flex flex-col gap-3">
      {ideas != null &&
        ideas.map((idea, index) => <IdeaCard key={index} idea={idea} />)}
    </div>
  );
}

export default CardContainer;
