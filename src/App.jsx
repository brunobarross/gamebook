import { useEffect, useRef, useState } from 'react';
import { db } from './Firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';

import Home from './pages/Home/Home';
import { HomeStorage } from './pages/Home/contexts/HomeContext';
import { TabelaStorage } from './pages/Home/contexts/TabelaContext';
import Sidebar from './pages//Home/components/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoutes } from './Routes/Routes';
import AuthGoogle from './Contexts/AuthGoogle';

function App() {
  return (
    <AuthGoogle>
      <AppRoutes />
    </AuthGoogle>
  );
}

export default App;
