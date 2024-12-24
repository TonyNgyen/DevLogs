import { auth, db } from "@/app/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

function SignUpLoginForm({
  setLogin,
  setSignUp,
  setAuthPopup,
  setPopUpVariant,
  popUpVariant,
}: {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setPopUpVariant: React.Dispatch<React.SetStateAction<number>>;
  popUpVariant: number;
}) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log("User logged in:", userCredential.user);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPassword
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

  const handleAuth = async (e: React.FormEvent) => {
    if (popUpVariant == 0) {
      handleLogin(e);
    } else {
      handleSignUp(e);
    }
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="w-screen h-screen absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 z-40 flex justify-center items-center"
    >
      <div
        className="absolute w-full h-full bg-black opacity-50"
        onClick={() => setAuthPopup(false)}
      ></div>
      <div className="flex items-center justify-center">
        <div className="w-[85vw] bg-[#FFFFFF] p-6 rounded-[20px] border-[#FFFFFF] border-4 relative">
          <AnimatePresence initial={false} mode="wait">
            {popUpVariant == 0 ? (
              <motion.h1
                layoutId="title"
                key="login"
                className="text-4xl font-bold text-center mb-[15px]"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }} transition={{duration: 0.3, type:"spring"}}
              >
                Log In
              </motion.h1>
            ) : (
              <motion.h1
                layoutId="title"
                key="signup"
                className="text-4xl font-bold text-center mb-[15px]"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }} transition={{duration: 0.3, type:"spring"}}
              >
                Sign Up
              </motion.h1>
            )}
          </AnimatePresence>

          <form onSubmit={handleAuth} className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold">Email</h2>
              {popUpVariant == 0 ? (
                <input
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="border-b-[3px] border-b-black bg-transparent text-xl w-full"
                />
              ) : (
                <input
                  type="email"
                  placeholder="Email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  required
                  className="border-b-[3px] border-b-black bg-transparent text-xl w-full"
                />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">Password</h2>
              {popUpVariant == 0 ? (
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="border-b-[3px] border-b-black bg-transparent text-xl w-full"
                />
              ) : (
                <input
                  type="password"
                  placeholder="Password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  required
                  className="border-b-[3px] border-b-black bg-transparent text-xl w-full"
                />
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-[#E5D3FF] border-[#CCA8FF] border-[4px] rounded-lg py-1 font-bold text-xl"
            >
              <AnimatePresence initial={false} mode="wait">
                {popUpVariant == 0 ? (
                  <motion.p
                    layoutId="button"
                    key="loginButton"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }} transition={{duration: 0.3, type:"spring"}}
                  >
                    Log In
                  </motion.p>
                ) : (
                  <motion.p
                    layoutId="button"
                    key="signUpButton"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }} transition={{duration: 0.3, type:"spring"}}
                  >
                    Sign Up
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.button>
            <AnimatePresence initial={false} mode="wait">
              {popUpVariant == 0 ? (
                <motion.h2
                  layoutId="switch"
                  key="switchToSignUp"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }} transition={{duration: 0.3, type:"spring"}}
                  className="text-center text-xl"
                >
                  Have no account?
                  <span
                    className="font-bold"
                    onClick={() => {
                      setPopUpVariant(1);
                    }}
                  >
                    {" "}
                    Sign up!
                  </span>
                </motion.h2>
              ) : (
                <motion.h2
                  layoutId="switch"
                  key="switchToLogin"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }} transition={{duration: 0.3, type:"spring"}}
                  className="text-center text-xl"
                >
                  Have an account?
                  <span
                    className="font-bold"
                    onClick={() => {
                      setPopUpVariant(0);
                    }}
                  >
                    {" "}
                    Log in!
                  </span>
                </motion.h2>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default SignUpLoginForm;
