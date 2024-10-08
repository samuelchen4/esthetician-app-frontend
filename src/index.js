import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MarketplacePage from "./pages/MarketplacePage";
import AetheticiansPage from "./pages/AetheticiansPage/AetheticiansPage";
import Header from "./components/Header";
import { ClerkProvider } from "@clerk/clerk-react";
import SignUpQuestionnairePage from "src/pages/SignUpQuestionnairePage/SignUpQuestionnarePage";
import LikesPage from "./pages/LikesPage";
import ManageAccountPage from "./pages/ManageAccountPage";
import PersonalSettingsPages from "src/pages/PersonalSettingsPage/PersonalSettingsPage";
import AestheticianSettingsPage from "src/pages/AestheticianSettingsPage/AestheticianSettingsPage";
import TestPage from "./pages/AetheticiansPage/TestPage";
import MobileNav from "./MobileNav";

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || null;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="border-box h-[100dvh] flex flex-col pt-safe-top text-lg ">
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Router basename="/">
        {/* <div className="z-10">
          <Header />
        </div> */}
        <div className="relative pb-14 box-border z-0">
          <Routes>
            <Route path="/" element={<MarketplacePage />} />
            <Route path="/home" element={<MarketplacePage />} />
            {/* <Route path='/client-info/:userId' element={<TestPage />} /> */}
            <Route path="/client-info/:userId" element={<AetheticiansPage />} />
            <Route
              path="/sign-up/questionnaire/*"
              element={<SignUpQuestionnairePage />}
            />
            <Route path="/users/:userId/likes" element={<LikesPage />} />
            <Route
              path="/users/:userId/manage-account"
              element={<ManageAccountPage />}
            />
            <Route
              path="/users/:userId/personal-info"
              element={<PersonalSettingsPages />}
            />
            <Route
              path="/users/:userId/ethetician-info"
              element={<AestheticianSettingsPage />}
            />
          </Routes>
        </div>
        <MobileNav className="fixed bottom-0 left-0 right-0" />
      </Router>
    </ClerkProvider>
  </div>
);
