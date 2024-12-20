"use client";

import React, { useEffect, useState } from "react";
import CardContainer from "@/components/cardContainer/cardContainer";
import Header from "@/components/header/header";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";

export default function Home() {
  const [user, setUser] = useState<User | null>(null); // Store the user state
  const [loading, setLoading] = useState<boolean>(true); // Loading state to show something while checking auth

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user if logged in
      } else {
        setUser(null); // Set null if logged out
      }
      setLoading(false); // Hide loading state once auth is checked
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);
  if (user) {
    return (
      <div className="">
        <Header />
        <CardContainer />
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center gap-2">
        <button className="">
          <a
            href="/login"
            className="bg-[#E5D3FF] text-2xl px-4 py-1 border-[#CCA8FF] border-4 rounded-lg font-bold"
          >
            Login
          </a>
        </button>
        <button className="border-4 border-[#CCA8FF] text-2xl px-4 py-1 rounded-lg font-bold">
          <a href="/signUp">Sign Up</a>
        </button>
      </div>
    );
  }
}
