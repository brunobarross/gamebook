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
import { Plus, PlusCircle, UserFocus, X } from 'phosphor-react';
import Modal from './components/Modal';
import Tabela from './components/Tabela';

function App() {
  const [jogos, setJogos] = useState([]);
  const [novoJogo, setNovoJogo] = useState('');
  const [statusJogo, setStatusJogo] = useState('abandonado');
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
    }
    await addDoc(jogosCollectionRef, obj);
    setJogos(...jogos, obj)
    inputElement.current.value = ''
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
        <Tabela jogos={jogos} deletarJogo={deletarJogo} />

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
