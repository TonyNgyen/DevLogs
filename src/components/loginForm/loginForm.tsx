"use client";

import { auth } from "@/app/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { motion } from "motion/react";

function LoginForm({
  setLogin,
  setSignUp,
}: {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="w-full bg-[#FFFFFF] p-6 rounded-[20px] border-[#FFFFFF] border-4 relative"
      >
        <h1 className="text-4xl font-bold text-center mb-[15px]">Log In</h1>

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
            Log in
          </motion.button>
          <h2 className="text-center text-xl">
            Have no Account?
            <span
              className="font-bold"
              onClick={() => {
                setLogin(false);
                setSignUp(true);
              }}
            > Sign up!</span>
          </h2>
        </form>
      </motion.div>
    </div>
  );
}

export default LoginForm;
