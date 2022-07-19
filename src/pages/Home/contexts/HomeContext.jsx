import React from 'react';
import { db } from '../../../Firebase';
import axios from 'axios';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  serverTimestamp,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
export const HomeContext = React.createContext();

export const HomeStorage = ({ children }) => {
  const [jogos, setJogos] = React.useState([]);
  const [novoJogo, setNovoJogo] = React.useState('');
  const [statusJogo, setStatusJogo] = React.useState('Abandonado');
  const jogosCollectionRef = collection(db, 'games');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [sidebarOpen, setSideBarOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalType, setModalType] = React.useState(null);
  const [idJogo, setIdJogo] = React.useState(null);
  const inputElement = React.useRef();
  const selectElement = React.useRef();

  const getGames = async () => {
    setIsLoading(true);
    onSnapshot(collection(db, 'games'), (snapshot) => {
      try {
        setJogos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    });
  };

  const criarJogo = async (e) => {
    e.preventDefault();
    try {
      const obj = {
        nome: novoJogo,
        status: statusJogo,
        criado: serverTimestamp(),
      };
      await addDoc(jogosCollectionRef, obj);
      setJogos(...jogos, obj);
      inputElement.current.value = '';
      selectElement.current.value = 'Abandonado';
      setModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateGame = async (e) => {
    e.preventDefault();
    if (jogos) {
      try {
        const dbJogos = doc(db, 'games', idJogo);
        await updateDoc(dbJogos, {
          status: statusJogo,
        });
      } catch (err) {
        console.log(err);
      }
    }
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

  const handleClickEditButton = async (id) => {
    setIdJogo(id);
    setModalType('edicao');
    setModalOpen(!modalOpen);
  };

  React.useEffect(() => {
    getGames();
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
        selectElement,
        criarJogo,
        deletarJogo,
        updateGame,
        handleClickEditButton,
        setSideBarOpen,
        sidebarOpen,
        isLoading,
        setIsLoading,
        modalType,
        setModalType,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
