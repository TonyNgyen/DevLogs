"use client";

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/app/firebase";
import { motion } from "motion/react";

function SignUpForm({
  setLogin,
  setSignUp,
}: {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created:", userCredential.user);
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { createdAt: serverTimestamp() }, { merge: true });
      const settingsRef = doc(collection(userRef, "settings"));
      await setDoc(settingsRef, {});
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="w-full bg-[#FFFFFF] p-6 rounded-[20px] border-[#FFFFFF] border-4 relative"
      >
        <h1 className="text-4xl font-bold text-center mb-[15px]">Sign Up</h1>

        <form onSubmit={handleSignUp} className="flex flex-col gap-6">
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
            Sign Up
          </motion.button>
          <h2 className="text-center text-xl">
            Already Have an Account?
            <span
              className="font-bold"
              onClick={() => {
                setLogin(true);
                setSignUp(false);
              }}
            >
              {" "}
              Log in!
            </span>
          </h2>
        </form>
      </motion.div>
    </div>
  );
}

export default SignUpForm;
