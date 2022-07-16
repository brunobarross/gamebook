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
import axios from 'axios';
import { Plus, PlusCircle, Trash, UserFocus, X } from 'phosphor-react';
import Modal from './components/Modal';
import Tabela from './components/Tabela';
import DataTable, { createTheme } from 'react-data-table-component';

function App() {
  const [jogos, setJogos] = useState([]);
  const [novoJogo, setNovoJogo] = useState('');
  const [statusJogo, setStatusJogo] = useState('Abandonado');
  const jogosCollectionRef = collection(db, 'games');
  const [modalOpen, setModalOpen] = useState(false);
  const inputElement = useRef();

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
        backgroundColor: 'rgb(25,135,84)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: (row) => row.status == 'Jogando',
      style: {
        backgroundColor: '#FFC107',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: (row) => row.status == 'Abandonado',
      style: {
        backgroundColor: '#DC3545',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  ];
  useEffect(() => {
    onSnapshot(collection(db, 'games'), (snapshot) =>
      setJogos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
    );
  }, []);

  return (
    <div className="flex mt-32 items-center justify-center">
      <div className="container px-6">
        <button
          className="mt-4 bg-primary-pure flex items-center justify-center w-[200px] h-12 text-white py-4 px-[.875rem] rounded-md text-sm cursor-pointer ml-auto"
          onClick={() => setModalOpen(!modalOpen)}
        >
          <PlusCircle size={16} color={'white'} className="mr-2" />
          Novo Jogo
        </button>
        {jogos.length && (
          <DataTable
            noDataComponent="Não há jogos cadastrados"
            columns={columns}
            data={jogos}
            customStyles={customStyles}
            conditionalRowStyles={conditionalRowStyles}
          />
        )}
      </div>

      <div className={`modal-container ${modalOpen ? 'ativo' : ''}`}>
        <Modal
          setNovoJogo={setNovoJogo}
          setStatusJogo={setStatusJogo}
          criarJogo={criarJogo}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          inputElement={inputElement}
        />
      </div>
    </div>
  );
}

export default App;
