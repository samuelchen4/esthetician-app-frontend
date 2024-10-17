import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MarketplacePage from './pages/MarketplacePage';
import AetheticiansPage from './pages/AetheticiansPage/AetheticiansPage';
import Header from './components/Header';
import { ClerkProvider } from '@clerk/clerk-react';
import SignUpQuestionnairePage from 'src/pages/SignUpQuestionnairePage/SignUpQuestionnarePage';
import LikesPage from 'src/pages/LikesPage/LikesPage';
import ManageAccountPage from './pages/ManageAccountPage';
import PersonalSettingsPages from 'src/pages/PersonalSettingsPage/PersonalSettingsPage';
import AestheticianSettingsPage from 'src/pages/AestheticianSettingsPage/AestheticianSettingsPage';

import MobileNav from './MobileNav';
import ExplorePage from 'src/pages/ExplorePage/ExplorePage';
import SearchPage from 'src/pages/SearchPage/SearchPage';
import SearchModalPage from 'src/pages/SearchModalPage/SearchModalPage';
import LoginPage from 'src/pages/LoginPage/LoginPage';
import SettingsPage from 'src/pages/SettingsPage/SettingsPage';
import ScrollToTop from 'src/components/ScrollToTop';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || null;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='border-box h-[100dvh] flex flex-col pt-safe-top text-lg '>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <Router basename='/'>
        <ScrollToTop />
        {/* <div className="z-10">
          <Header />
        </div> */}
        <div className=' pb-14 box-border z-0'>
          <Routes>
            <Route path='/' element={<ExplorePage />} />
            <Route path='/explore' element={<ExplorePage />} />
            <Route path='/home' element={<MarketplacePage />} />
            {/* <Route path='/client-info/:userId' element={<TestPage />} /> */}
            <Route path='/client-info/:userId' element={<AetheticiansPage />} />
            <Route
              path='/sign-up/questionnaire/*'
              element={<SignUpQuestionnairePage />}
            />
            <Route path='/likes' element={<LikesPage />} />
            <Route path='/profile' element={<SettingsPage />} />
            <Route
              path='/users/:userId/personal-info'
              element={<PersonalSettingsPages />}
            />
            <Route
              path='/users/:userId/ethetician-info'
              element={<AestheticianSettingsPage />}
            />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/search/search-page' element={<SearchModalPage />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </div>
        <MobileNav className='fixed z-10 bottom-0 left-0 right-0' />
      </Router>
    </ClerkProvider>
  </div>
);
