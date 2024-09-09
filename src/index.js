import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MarketplacePage from './pages/MarketplacePage';
import ClientInfoPage from './pages/ClientInfoPage';
import Header from './components/Header';
import { ClerkProvider } from '@clerk/clerk-react';
import SignUpQuestionnairePage from './pages/SignUpQuestionnairePage';
import LikesPage from './pages/LikesPage';
import ManageAccountPage from './pages/ManageAccountPage';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || null;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='border-box h-[100dvh] flex flex-col pt-safe-top'>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <Router>
        <div className='z-10'>
          <Header />
        </div>
        <div className='relative z-0 mt-[50px] h-full box-border border'>
          <Routes>
            <Route path='/' element={<MarketplacePage />} />
            <Route path='/home' element={<MarketplacePage />} />
            <Route path='/client-info/:userId' element={<ClientInfoPage />} />
            <Route
              path='/sign-up/questionnaire'
              element={<SignUpQuestionnairePage />}
            />
            <Route path='/users/:userId/likes' element={<LikesPage />} />
            <Route
              path='/users/:userId/manage-account'
              element={<ManageAccountPage />}
            />
          </Routes>
        </div>
      </Router>
    </ClerkProvider>
  </div>
);
