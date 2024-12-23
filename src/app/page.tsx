"use client";

import React, { useEffect, useState } from "react";
import CardContainer from "@/components/cardContainer/cardContainer";
import { signInWithEmailAndPassword } from "firebase/auth";
import Header from "@/components/header/header";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
import { motion } from "motion/react";

export default function Home() {
  const [user, setUser] = useState<User | null>(null); // Store the user state
  const [loading, setLoading] = useState(true); // Track loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

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
        <Header />
        <CardContainer />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-[calc(100vh-40px)]">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-80 bg-[#E2E2E2] p-6 rounded-[20px] border-[#9E9E9E] border-4"
      >
        <h1 className="text-4xl font-bold text-center mb-[15px]">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold">Email</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-b-[3px] border-b-black bg-transparent text-xl w-full"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Password</h2>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-b-[3px] border-b-black bg-transparent text-xl w-full"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-[#E5D3FF] border-[#CCA8FF] border-[4px] rounded-lg py-1 font-bold text-xl"
          >
            Login
          </motion.button>
          <h2 className="text-center">
            Have no Account?
            <span className="font-bold">
              <a href="/signUp"> Sign up!</a>
            </span>
          </h2>
        </form>
      </motion.div>
    </div>
  );
}
