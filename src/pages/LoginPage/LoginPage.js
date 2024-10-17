import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  // UserButton,
  useUser,
} from "@clerk/clerk-react";

const LoginPage = () => {
  return (
    <div className="p-4 flex flex-col space-y-6">
      <p>This is the login page</p>
      <p>Click this button to sign up or sign in</p>
      <SignInButton className="py-2 px-4 border rounded-lg border-black" />
    </div>
  );
};

export default LoginPage;
