import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './pages/Home/Home';
import Game from './pages/Game/Game';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render ( 
  <React.StrictMode>
    <BrowserRouter>
      <Home/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game' element={<Game />} />
        <Route path='/*' element={<>404 not found</>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


