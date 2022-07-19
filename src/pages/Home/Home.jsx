import React, { Fragment } from 'react';
import { Pen, Plus, PlusCircle, Trash, UserFocus, X } from 'phosphor-react';
import Modal from './components/Modal';
import DataTable from 'react-data-table-component';
import { HomeContext } from './contexts/HomeContext';
import { TabelaContext } from './contexts/TabelaContext';
import Navbar from './components/NavBar';
import { AuthGoogleContext } from '../../Contexts/AuthGoogle';

const Home = () => {
  const home = React.useContext(HomeContext);
  const tabela = React.useContext(TabelaContext);
  const { user } = React.useContext(AuthGoogleContext);
  const modalRef = React.useRef(null);
  const buttonRef = React.useRef(null);

  const closeModalOnOutsideClick = (e) => {
    if (e.target === modalRef.current) {
      home.setModalOpen(false);
    }
  };

  const openModalCriacao = () => {
    home.setModalType('criacao');
    home.setModalOpen(!home.modalOpen);
  };

  return (
    <div className="mx-auto w-full sm:pl-[300px] relative overflow-hidden flex flex-col ">
      {home.isLoading ? (
        'carregando'
      ) : (
        <Fragment>
          <Navbar />
          <div className="content">
            <button
              className=" bg-primary-pure flex items-center justify-center w-[200px] h-12 text-white py-4 px-[.875rem] rounded-md text-sm cursor-pointer"
              onClick={openModalCriacao}
            >
              <PlusCircle size={16} color={'white'} className="mr-2" />
              Novo Jogo
            </button>
            {home.jogos.length ? (
              <DataTable
                noDataComponent="Não há jogos cadastrados"
                columns={tabela.columns}
                data={home.jogos}
                customStyles={tabela.customStyles}
                conditionalRowStyles={tabela.conditionalRowStyles}
              />
            ) : (
              <div className="">
                <p className="text-center mt-16 text-lg text-neutral-70">
                  Ei, não há nenhum jogo cadastrado por aqui!
                </p>
              </div>
            )}

            <div
              className={`modal-container ${home.modalOpen ? 'ativo' : ''}`}
              onClick={(e) => closeModalOnOutsideClick(e)}
              ref={modalRef}
            >
              <Modal />
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Home;
