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

function App() {
  const [jogos, setJogos] = useState([]);
  const [novoJogo, setNovoJogo] = useState('');
  const [statusJogo, setStatusJogo] = useState('Abandonado');
  const jogosCollectionRef = collection(db, 'games');
  const [modalOpen, setModalOpen] = useState(false);

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

        <table className="mt-16 table-auto w-full text-sm text-left text-white rounded-md  border border-neutral-10 ">
          <thead className="text-xs text-neutral-60 uppercase bg-neutral-02 ">
            <tr>
              <th scope="col" className="py-3 px-2 ">
                Nome
              </th>
              <th scope="col" className="py-3 px-2">
                Status
              </th>
              <th scope="col" className="py-3 px-2 ">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {jogos.length ? (
              jogos.map(({ nome, status, id }) => {
                return (
                  <tr key={id} className="bg-white border-b hover:bg-gray-50">
                    <td
                      scope="row"
                      className="py-3 px-2 text-sm font-normal text-neutral-90 whitespace-nowrap"
                    >
                      {nome}
                    </td>
                    <td
                      scope="row"
                      className="py-3 px-2 text-sm font-normal text-neutral-90 whitespace-nowrap"
                    >
                      {status}
                    </td>
                    <td
                      scope="row"
                      className="py-3 px-2 text-sm font-normal text-neutral-90 whitespace-nowrap"
                    >
                      <button
                        className=" grid place-items-center w-8 h-8 bg-alert-red-100 "
                        id={id}
                        onClick={(e) => deletarJogo(id)}
                      >
                        <X />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={12}
                  className="py-3 px-2 text-sm font-normal text-neutral-90 whitespace-nowrap text-center"
                >
                  Não há jogos cadastrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className={`modal-container ${modalOpen ? 'ativo' : ''}`}>
        <Modal
          setNovoJogo={setNovoJogo}
          setStatusJogo={setStatusJogo}
          criarJogo={criarJogo}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
        />
      </div>
    </div>
  );
}

export default App;
