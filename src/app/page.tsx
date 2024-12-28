"use client";

import React, { useEffect, useState } from "react";
import CardContainer from "@/components/cardContainer/cardContainer";
import Header from "@/components/header/header";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
import styles from "./homePage.module.css";
import IdeaCardHeader from "@/components/ideaCardHeader/ideaCardHeader";
import { motion } from "motion/react";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const heroIdeas = [
    {
      id: "1",
      name: "Idea 1",
      createdAt: "1/1/2024",
      borderColor: "FF7EA1",
      fillColor: "FFBED0",
      notes: [
        { id: "1", content: "Develop API", importance: 3, subnotes: [] },
        {
          id: "2",
          content: "Fix critical security bugs",
          importance: 3,
          subnotes: [],
        },
        {
          id: "3",
          content: "Write unit tests for functions",
          importance: 2,
          subnotes: [],
        },
        {
          id: "4",
          content: "Optimize database queries",
          importance: 3,
          subnotes: [],
        },
        {
          id: "17",
          content: "Optimize front-end performance",
          importance: 3,
          subnotes: [],
        },
      ],
    },
    {
      id: "2",
      name: "Idea 2",
      createdAt: "1/1/2024",
      borderColor: "FF9090",
      fillColor: "FFC7C7",
      notes: [
        {
          id: "5",
          content: "Create UI mockups for approval",
          importance: 2,
          subnotes: [],
        },
        {
          id: "6",
          content: "Refactor legacy code",
          importance: 2,
          subnotes: [],
        },
        {
          id: "7",
          content: "Set up CI/CD pipeline",
          importance: 3,
          subnotes: [],
        },
        {
          id: "12",
          content: "Design database schema",
          importance: 3,
          subnotes: [],
        },
        {
          id: "13",
          content: "Implement authentication system",
          importance: 3,
          subnotes: [],
        },
      ],
    },
    {
      id: "3",
      name: "Idea 3",
      createdAt: "1/1/2024",
      borderColor: "FFA656",
      fillColor: "FFD2AA",
      notes: [
        {
          id: "8",
          content: "Add error handling to endpoints",
          importance: 3,
          subnotes: [],
        },
        {
          id: "9",
          content: "Research third-party integrations",
          importance: 1,
          subnotes: [],
        },
        {
          id: "10",
          content: "Document codebase for team",
          importance: 2,
          subnotes: [],
        },
      ],
    },
    {
      id: "4",
      name: "Idea 4",
      createdAt: "1/1/2024",
      borderColor: "FFD55E",
      fillColor: "FFEAAE",
      notes: [
        {
          id: "11",
          content: "Implement dark mode support",
          importance: 1,
          subnotes: [],
        },
        {
          id: "19",
          content: "Implement user profile management",
          importance: 2,
          subnotes: [],
        },
        {
          id: "20",
          content: "Explore multi-language support",
          importance: 1,
          subnotes: [],
        },
      ],
    },
    {
      id: "5",
      name: "Idea 5",
      createdAt: "1/1/2024",
      borderColor: "61CA68",
      fillColor: "AFE4B3",
      notes: [
        {
          id: "28",
          content: "Analyze user feedback for updates",
          importance: 1,
          subnotes: [],
        },
        {
          id: "29",
          content: "Build real-time notifications",
          importance: 3,
          subnotes: [],
        },
        {
          id: "30",
          content: "Enhance mobile responsiveness",
          importance: 2,
          subnotes: [],
        },
        {
          id: "12",
          content: "Design database schema",
          importance: 3,
          subnotes: [],
        },
        {
          id: "13",
          content: "Implement authentication system",
          importance: 3,
          subnotes: [],
        },
      ],
    },
    {
      id: "6",
      name: "Idea 6",
      createdAt: "1/1/2024",
      borderColor: "7BC7FF",
      fillColor: "BCE3FF",
      notes: [
        {
          id: "35",
          content: "Configure environment variables",
          importance: 3,
          subnotes: [],
        },
        {
          id: "36",
          content: "Create test data generators",
          importance: 2,
          subnotes: [],
        },
        {
          id: "37",
          content: "Research AI model integration",
          importance: 1,
          subnotes: [],
        },
      ],
    },
    {
      id: "7",
      name: "Idea 7",
      createdAt: "1/1/2024",
      borderColor: "CCA8FF",
      fillColor: "E5D3FF",
      notes: [
        {
          id: "44",
          content: "Review application security policies",
          importance: 3,
          subnotes: [],
        },
        {
          id: "45",
          content: "Prototype new feature ideas",
          importance: 1,
          subnotes: [],
        },
        {
          id: "46",
          content: "Improve error message clarity",
          importance: 2,
          subnotes: [],
        },
        {
          id: "30",
          content: "Enhance mobile responsiveness",
          importance: 2,
          subnotes: [],
        },
        {
          id: "31",
          content: "Develop backup and restore features",
          importance: 3,
          subnotes: [],
        },
      ],
    },
    {
      id: "8",
      name: "Idea 8",
      createdAt: "1/1/2024",
      borderColor: "000000",
      fillColor: "FFFFFF",
      notes: [
        {
          id: "41",
          content: "Add accessibility features",
          importance: 2,
          subnotes: [],
        },
        {
          id: "42",
          content: "Monitor server performance",
          importance: 3,
          subnotes: [],
        },
      ],
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
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl border-[#CCA8FF] bg-[#E5D3FF] border-[3px] font-bold rounded-md py-1 px-3"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl border-[#CCA8FF] border-[3px] font-bold rounded-md py-1 px-3"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </div>

        <div className="md:w-[62%] h-full mt-12 md:mt-0 flex flex-col items-center justify-center gap-2 overflow-hidden z-0">
          <div className={`flex my-0 mx-auto ${styles.carousel}`}>
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
