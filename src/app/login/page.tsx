"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

const Login = () => {
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
    <div className="flex items-center justify-center h-[calc(100vh-40px)]">
      <div className="w-80 bg-[#E2E2E2] p-6 rounded-[20px] border-[#9E9E9E] border-4">
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

          <button
            type="submit"
            className="bg-[#E5D3FF] border-[#CCA8FF] border-[4px] rounded-lg py-1 font-bold text-xl"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
