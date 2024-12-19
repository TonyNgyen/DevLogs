"use client";

import React, { useEffect, useState } from "react";
import IdeaCard from "../ideaCard/ideaCard";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/app/firebase";

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

function CardContainer() {
  const [ideas, setIdeas] = useState<Idea[] | null>();
  const user = auth.currentUser;
  useEffect(() => {
    if (!user?.uid) {
      return;
    }
    const unsubscribe = onSnapshot(
      collection(db, "users", user?.uid, "ideas"),
      (snapshot) => {
        const ideaArray: Idea[] = snapshot.docs.map(
          (doc) => doc.data() as Idea
        );
        setIdeas(ideaArray);
      }
    );
    return () => unsubscribe();
  }, [user?.uid]);
  return (
    <div className="flex flex-col gap-3">
      {ideas != null &&
        ideas.map((idea, index) => <IdeaCard key={index} idea={idea} />)}
    </div>
  );
}

export default CardContainer;
