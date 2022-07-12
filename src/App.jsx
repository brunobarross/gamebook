import { useEffect, useState } from 'react';
import { db } from './Firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore/lite';
import { X } from 'phosphor-react';

function App() {
  const [jogos, setJogos] = useState([]);
  const [novoJogo, setNovoJogo] = useState('');
  const [statusJogo, setStatusJogo] = useState('');
  const jogosCollectionRef = collection(db, 'games');

  const getGames = async () => {
    try {
      const data = await getDocs(jogosCollectionRef);
      setJogos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(jogos);
    } catch (err) {
      console.log(err);
    }
  };

  const criarJogo = async (e) => {
    e.preventDefault();
    await addDoc(jogosCollectionRef, {
      nome: novoJogo,
      status: statusJogo,
      criado: serverTimestamp(),
    });
  };

  const deletarJogo = async (id) => {
    const jogoDoc = doc(db, 'games', id);
    await deleteDoc(jogoDoc);
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container">
        <div className=" mx-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md overflow-hidden">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Nome
                </th>
                <th scope="col" className="py-3 px-6">
                  Status
                </th>
                <th scope="col" className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {jogos &&
                jogos.map(({ nome, status, id }) => {
                  return (
                    <tr
                      key={id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className='scope="row" class="py-4 px-6 font-medium text-white whitespace-nowrap dark:text-white"'>
                        {nome}
                      </td>
                      <td
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {status}
                      </td>
                      <td
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <button type="button" onClick={() => deletarJogo(id)}>
                          Deletar
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <form
            className="mt-32 flex flex-col items-center justify-center "
            onSubmit={criarJogo}
          >
            <input
              className="w-full border border-neutral-800 py-3 px-4 outline-none rounded-sm  visited:to-blue-400"
              id="nome"
              name="nome"
              type="text"
              placeholder="Nome do jogo"
              required
              onChange={(e) => setNovoJogo(e.target.value)}
            />
            <select
              className="mt-4 w-full border border-neutral-800 py-3 px-4 outline-none rounded-sm  visited:to-blue-400"
              onChange={(e) => setStatusJogo(e.target.value)}
              id="status"
              name="status"
              required
            >
              <option value="abandonado">abandonado</option>
              <option value="terminado">terminado</option>
              <option value="terminando">terminando</option>
            </select>
            <button className="mt-4 bg-blue-600 flex items-center justify-center w-full h-12 text-white">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
