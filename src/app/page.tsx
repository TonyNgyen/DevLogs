"use client";

import React, { useEffect, useState } from "react";
import CardContainer from "@/components/cardContainer/cardContainer";
import Header from "@/components/header/header";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
// import IdeaCard from "@/components/ideaCard/ideaCard";
// import styles from "./homePage.module.css";

export default function Home() {
  const [user, setUser] = useState<User | null>(null); // Store the user state
  const [loading, setLoading] = useState(true); // Track loading state

  // const heroIdeas = [
  //   {
  //     id: "1",
  //     name: "Idea 1",
  //     createdAt: "1/1/2024",
  //     color: "7BC7FF",
  //     notes: [],
  //   },
  //   {
  //     id: "2",
  //     name: "Idea 2",
  //     createdAt: "1/1/2024",
  //     color: "7BC7FF",
  //     notes: [],
  //   },
  //   {
  //     id: "3",
  //     name: "Idea 3",
  //     createdAt: "1/1/2024",
  //     color: "7BC7FF",
  //     notes: [],
  //   },
  // ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user if logged in
      } else {
        setUser(null); // Set null if logged out
      }
      setLoading(false); // Authentication state is determined
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (user) {
    return (
      <div>
        <Header loggedIn={true} />
        <CardContainer />
      </div>
    );
  }

  return (
    <div>
      <Header loggedIn={false} />
      <div className="mb-16 md:mb-0 md:flex md:w-[calc(100vw-40px)] md:h-[calc(100vh-136px)]">
        <div className="md:w-1/2 flex flex-col md:pl-60 md:justify-center md:h-full">
          <div
            className="mt-3 mb-4 md:mt-0 font-bold"
            style={{ fontSize: "5rem", lineHeight: 1 }}
          >
            <h1>Plan</h1>
            <h1>Organize</h1>
            <h1>Develop</h1>
          </div>
          <h2 className="text-3xl font-semibold mb-3 ">
            Made easy with DevLogs
          </h2>
          <div className="flex gap-4 ">
            <button className="text-2xl border-[#CCA8FF] bg-[#E5D3FF] border-[3px] font-bold rounded-md py-1 px-3">
              Get Started
            </button>
            <button className="text-2xl border-[#CCA8FF] border-[3px] font-bold rounded-md py-1 px-3">
              Learn More
            </button>
          </div>
        </div>
        {/* <div className="md:w-1/2 h-full mt-12">
          <div className={`flex my-0 mx-auto overflow-hidden`}>
            <div className={`flex gap-2 pr-2 ${styles.group}`}>
              {heroIdeas.map((idea) => (
                <div className="w-[calc(100vw-40px)]">
                  <IdeaCard idea={idea} key={idea.id} />
                </div>
              ))}
            </div>

            <div className={`flex gap-2 pr-2 ${styles.group}`}>
              {heroIdeas.map((idea) => (
                <div className="w-[calc(100vw-40px)]">
                  <IdeaCard idea={idea} key={idea.id} />
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
