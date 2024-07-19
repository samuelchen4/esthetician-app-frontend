import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MarketplacePage from './pages/MarketplacePage';
import ClientInfoPage from './pages/ClientInfoPage';
import Header from './components/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='box-border h-screen min-w-[350px] text-[16px] font-inter overflow-auto'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<MarketplacePage />} />
          <Route path='/home' element={<MarketplacePage />} />
          <Route path='/client-info/:clientId' element={<ClientInfoPage />} />
        </Routes>
      </Router>
    </div>
  </React.StrictMode>
);
