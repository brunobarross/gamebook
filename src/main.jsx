import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/css/tailwind.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Home/Home';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
    </BrowserRouter>
 
  </React.StrictMode>,
);
