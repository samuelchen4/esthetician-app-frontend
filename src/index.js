import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MarketplacePage from './pages/MarketplacePage';
import ClientInfoPage from './pages/ClientInfoPage';
import Header from './components/Header';
import { ClerkProvider } from '@clerk/clerk-react';
import SignUpQuestionnairePage from './pages/SignUpQuestionnairePage';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || null;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='relative h-screen flex flex-col pt-safe-top'>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <Router>
        <Header />
        <div className='box-border pt-[50px] flex flex-col h-full'>
          <Routes>
            <Route path='/' element={<MarketplacePage />} />
            <Route path='/home' element={<MarketplacePage />} />
            <Route path='/client-info/:clientId' element={<ClientInfoPage />} />
            <Route
              path='/sign-up/questionnaire'
              element={<SignUpQuestionnairePage />}
            />
          </Routes>
        </div>
      </Router>
    </ClerkProvider>
  </div>
);
