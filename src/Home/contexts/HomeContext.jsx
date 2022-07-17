import React from 'react';
import { db } from '../../Firebase';
import axios from 'axios';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';
export const HomeContext = React.createContext();

export const HomeStorage = ({ children }) => {
  const [jogos, setJogos] = React.useState([]);
  const [novoJogo, setNovoJogo] = React.useState('');
  const [statusJogo, setStatusJogo] = React.useState('Abandonado');
  const jogosCollectionRef = collection(db, 'games');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [sidebarOpen, setSideBarOpen] = React.useState(false);
  const inputElement = React.useRef();

  const getGames = async () => {
    try {
      const data = await getDocs(jogosCollectionRef);
      setJogos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.log(err);
    }
  };

  const criarJogo = async (e) => {
    e.preventDefault();
    const obj = {
      nome: novoJogo,
      status: statusJogo,
      criado: serverTimestamp(),
    };
    await addDoc(jogosCollectionRef, obj);
    setJogos(...jogos, obj);
    inputElement.current.value = '';
  };

  const deletarJogo = async (id) => {
    if (jogos) {
      try {
        await deleteDoc(doc(db, 'games', id));
        setJogos(jogos.filter((jogo) => jogo.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  React.useEffect(() => {
    onSnapshot(collection(db, 'games'), (snapshot) =>
      setJogos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
    );
  }, []);


  return (
    <HomeContext.Provider
      value={{
        jogos,
        setJogos,
        novoJogo,
        setNovoJogo,
        statusJogo,
        setStatusJogo,
        modalOpen,
        setModalOpen,
        inputElement,
        criarJogo,
        deletarJogo,
        setSideBarOpen,
        sidebarOpen
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
