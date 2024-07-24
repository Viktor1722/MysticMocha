import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/clerk-react";
import MainPage from "./MainPage";

const clerkFrontendApi = "VITE_CLERK_PUBLISHABLE_KEY"; // Make sure this is properly set

function Login() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <div className="logout">
          <MainPage />
          <SignOutButton>Logout</SignOutButton>
        </div>
      </SignedIn>
    </header>
  );
}

function Dashboard() {
  const { user } = useUser();
  return <div>Welcome, {user.firstName}</div>;
}

export default Login;
