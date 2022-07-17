import { useEffect, useRef, useState } from "react";
import { db } from "./Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";




import Home from "./Home/Home";
import { HomeStorage } from "./Home/contexts/HomeContext";
import { TabelaStorage } from "./Home/contexts/TabelaContext";
import Sidebar from "./Home/components/Sidebar";


function App() {
  return (
    <div className="flex">
      <HomeStorage>
        <TabelaStorage>
          <Sidebar />
          <Home />
        </TabelaStorage>
      </HomeStorage>
    </div>
  );
}

export default App;
