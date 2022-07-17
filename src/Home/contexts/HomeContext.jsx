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

  const columns = [
    {
      name: 'Nome',
      selector: (row) => row.nome.toUpperCase(),
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status.toUpperCase(),
      sortable: true,
    },
    {
      name: 'Ações',
      cell: (row) => (
        <>
          <button
            className=" grid place-items-center w-8 h-8 bg-alert-red-100 rounded-[4px] "
            id={row.id}
            onClick={(e) => deletarJogo(row.id)}
          >
            <Trash size={16} color="#fff" />
          </button>
          <button
            className=" grid place-items-center w-8 h-8 bg-primary-pure-40 rounded-[4px] ml-4 "
            id={row.id}
            onClick={(e) => deletarJogo(row.id)}
          >
            <Pen size={16} color="#fff" />
          </button>
        </>
      ),
    },
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: '3rem', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '.5rem', // override the cell padding for head cells
        paddingRight: '.5rem',
      },
    },
    cells: {
      style: {
        paddingLeft: '.5rem', // override the cell padding for data cells
        paddingRight: '.5rem',
      },
    },
  };
  const conditionalRowStyles = [
    {
      when: (row) => row.status == 'Finalizado',
      style: {
        backgroundColor: '#E6EDF5',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: (row) => row.status == 'Jogando',
      style: {
        backgroundColor: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: (row) => row.status == 'Abandonado',
      style: {
        backgroundColor: '#F2F2F2',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  ];

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
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
