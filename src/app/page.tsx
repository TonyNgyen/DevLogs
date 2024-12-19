"use client"

import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import CardContainer from "@/components/cardContainer/cardContainer";
import Header from "@/components/header/header";
import { auth } from "./firebase";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="">
      <Header />
      <CardContainer />
    </div>
  );
}
