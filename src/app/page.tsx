"use client";

import React, { useEffect, useState } from "react";
import CardContainer from "@/components/cardContainer/cardContainer";
import Header from "@/components/header/header";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
import styles from "./homePage.module.css";
import IdeaCardHeader from "@/components/ideaCardHeader/ideaCardHeader";

export default function Home() {
  const [user, setUser] = useState<User | null>(null); // Store the user state
  const [loading, setLoading] = useState(true); // Track loading state

  const heroIdeas = [
    {
      id: "1",
      name: "Idea 1",
      createdAt: "1/1/2024",
      borderColor: "FF7EA1",
      fillColor: "FFBED0",
      notes: [],
    },
    {
      id: "2",
      name: "Idea 2",
      createdAt: "1/1/2024",
      borderColor: "FF9090",
      fillColor: "FFC7C7",
      notes: [],
    },
    {
      id: "3",
      name: "Idea 3",
      createdAt: "1/1/2024",
      borderColor: "FFA656",
      fillColor: "FFD2AA",
      notes: [],
    },
    {
      id: "4",
      name: "Idea 4",
      createdAt: "1/1/2024",
      borderColor: "FFD55E",
      fillColor: "FFEAAE",
      notes: [],
    },
    {
      id: "5",
      name: "Idea 5",
      createdAt: "1/1/2024",
      borderColor: "61CA68",
      fillColor: "AFE4B3",
      notes: [],
    },
    {
      id: "6",
      name: "Idea 6",
      createdAt: "1/1/2024",
      borderColor: "7BC7FF",
      fillColor: "BCE3FF",
      notes: [],
    },
    {
      id: "7",
      name: "Idea 7",
      createdAt: "1/1/2024",
      borderColor: "CCA8FF",
      fillColor: "E5D3FF",
      notes: [],
    },
    {
      id: "8",
      name: "Idea 8",
      createdAt: "1/1/2024",
      borderColor: "000000",
      fillColor: "FFFFFF",
      notes: [],
    },
  ];

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
      <div className="mb-16 md:mb-0 md:flex md:w-[calc(100vw-40px)] md:h-[calc(100vh-136px)] items-center justify-center md:gap-4 lg:gap-0 md:pl-10">
        <div className="md:w-[50%] md:flex md:items-center md:justify-center">
          <div className="flex flex-col md:justify-center md:h-full">
            <div
              className="mt-3 mb-4 md:mt-0 font-bold text-7xl xl:text-8xl"
              // style={{ fontSize: "5rem", lineHeight: 1 }}
            >
              <h1>Plan</h1>
              <h1>Organize</h1>
              <h1>Develop</h1>
            </div>
            <h2 className="text-3xl font-semibold mb-3">
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
        </div>

        <div className="md:w-[62%] h-full mt-12 md:mt-0 flex flex-col items-center justify-center gap-2 overflow-hidden">
          <div
            className={`flex my-0 mx-auto overflow-hidden ${styles.carousel}`}
          >
            <div className={`flex gap-2 pr-2 ${styles.group}`}>
              {heroIdeas.map((idea) => (
                <div
                  className="w-[calc(100vw-40px)] md:w-[430px]"
                  key={idea.id}
                >
                  <IdeaCardHeader idea={idea} />
                </div>
              ))}
            </div>

            <div className={`flex gap-2 pr-2 ${styles.group}`}>
              {heroIdeas.map((idea) => (
                <div
                  className="w-[calc(100vw-40px)] md:w-[430px]"
                  key={idea.id + 9}
                >
                  <IdeaCardHeader idea={idea} />
                </div>
              ))}
            </div>
          </div>
          {/* <div className={`flex my-0 mx-auto overflow-hidden`}>
            <div className={`flex gap-2 pr-2 ${styles.group}`}>
              {heroIdeas.map((idea) => (
                <div className="w-[calc(100vw-40px)] md:w-[430px]">
                  <IdeaCard idea={idea} key={idea.id} />
                </div>
              ))}
            </div>

            <div className={`flex gap-2 pr-2 ${styles.group}`}>
              {heroIdeas.map((idea) => (
                <div className="w-[calc(100vw-40px)] md:w-[430px]">
                  <IdeaCard idea={idea} key={idea.id} />
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
