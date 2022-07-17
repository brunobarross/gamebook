import React from 'react';
import { Pen, Plus, PlusCircle, Trash, UserFocus, X } from 'phosphor-react';
import Modal from './components/Modal';
import DataTable from 'react-data-table-component';
import { HomeContext } from './contexts/HomeContext';
import { TabelaContext } from './contexts/TabelaContext';

const Home = () => {
  const home = React.useContext(HomeContext);
  const tabela = React.useContext(TabelaContext);

  return (
    <div className="mx-auto w-full sm:pl-[300px] relative min-h-screen overflow-hidden flex  flex-col ">
      <button
        className="mt-4 bg-primary-pure flex justify-center w-[200px] h-12 text-white py-4 px-[.875rem] rounded-md text-sm cursor-pointer ml-auto"
        onClick={() => home.setModalOpen(!home.modalOpen)}
      >
        <PlusCircle size={16} color={'white'} className="mr-2" />
        Novo Jogo
      </button>
      {home.jogos.length && (
        <DataTable
          noDataComponent="Não há jogos cadastrados"
          columns={tabela.columns}
          data={home.jogos}
          customStyles={tabela.customStyles}
          conditionalRowStyles={tabela.conditionalRowStyles}
        />
      )}

      <div className={`modal-container ${home.modalOpen ? 'ativo' : ''}`}>
        <Modal />
      </div>
    </div>
  );
};

export default Home;
