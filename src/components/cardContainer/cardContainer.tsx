"use client";

import React, { useEffect, useState } from "react";
import IdeaCard from "../ideaCard/ideaCard";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "@/app/firebase";

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
    const collectionRef = collection(db, "users", user.uid, "ideas");
    const ideasQuery = query(collectionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(ideasQuery, (snapshot) => {
      const ideaArray: Idea[] = snapshot.docs.map((doc) => doc.data() as Idea);
      setIdeas(ideaArray);
    });
    return () => unsubscribe();
  }, [user?.uid]);
  console.log(ideas);
  return (
    <div className="flex flex-col gap-3 lg:grid lg:grid-cols-4">
      {ideas != null &&
        ideas.map((idea) => <IdeaCard key={idea.id} idea={idea} />)}
    </div>
  );
}

export default CardContainer;
