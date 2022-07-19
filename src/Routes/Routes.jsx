import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import { HomeStorage } from '../pages/Home/contexts/HomeContext';
import Sidebar from '../pages/Home/components/Sidebar';
import { TabelaStorage } from '../pages/Home/contexts/TabelaContext';
import { PrivateRoutes } from './Index';

export const AppRoutes = (app) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<PrivateRoutes />}>
          <Route
            path="/home"
            element={
              <HomeStorage>
                <div className="flex">
                  <Sidebar />
                  <TabelaStorage>
                    <Home />
                  </TabelaStorage>
                </div>
              </HomeStorage>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
