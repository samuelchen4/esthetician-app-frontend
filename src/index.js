import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MarketplacePage from './pages/MarketplacePage';
import ClientInfoPage from './pages/ClientInfoPage';
import Header from './components/Header';
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <div className='box-border h-screen min-w-[350px] text-[16px] font-inter pt-safe-top overflow-y-auto'>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<MarketplacePage />} />
            <Route path='/home' element={<MarketplacePage />} />
            <Route path='/client-info/:clientId' element={<ClientInfoPage />} />
          </Routes>
        </Router>
      </div>
    </ClerkProvider>
  </React.StrictMode>
);
