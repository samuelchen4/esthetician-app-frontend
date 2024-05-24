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
    <div className='font-inter'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<MarketplacePage />} />
          <Route path='/home' element={<MarketplacePage />} />
          <Route path='/client-info' element={<ClientInfoPage />} />
        </Routes>
      </Router>
    </div>
  </React.StrictMode>
);
