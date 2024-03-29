import React, { useEffect } from 'react';
import { X } from 'phosphor-react';
import { HomeContext } from '../contexts/HomeContext';

const Modal = () => {
  const home = React.useContext(HomeContext);

  return (
    <div className="modal-content">
      <div className="modal-header flex items-start justify-between">
        <h3 className="font-medium text-2xl text-neutral-80">
          {home.modalType == 'criacao' ? 'Novo Jogo' : 'Editar Jogo'}
        </h3>
        <span
          className="w-8 h-8 grid place-items-center bg-primary-pure-light cursor-pointer"
          onClick={(e) => home.setModalOpen(!home.modalOpen)}
        >
          <X size={14} color={'#004993'} className="pointer-events-none" />
        </span>
      </div>

      {home.modalType == 'criacao' ? (
        <form
          className="mt-8 flex flex-col justify-center "
          onSubmit={home.criarJogo}
        >
          <input
            className="w-full border border-neutral-10 text-neutral-80 py-3 px-4 outline-none rounded-sm  visited:to-blue-400"
            id="nome"
            name="nome"
            type="text"
            placeholder="Nome do jogo"
            required
            ref={home.inputElement}
            onChange={(e) => home.setNovoJogo(e.target.value)}
          />
          <select
            className="mt-4 w-full border border-neutral-10 text-neutral-80  py-3 px-4 outline-none rounded-sm  visited:to-blue-400"
            onChange={(e) => home.setStatusJogo(e.target.value)}
            id="status"
            name="status"
            required
            ref={home.selectElement}
          >
            <option value="Abandonado">ABANDONADO</option>
            <option value="Jogando">JOGANDO</option>
            <option value="Finalizado">FINALIZADO</option>
          </select>
          <div className="btn-container flex justify-end">
            <button className="mt-4 bg-primary-pure flex items-center justify-center w-full lg:w-[200px] h-12 text-white py-4 px-[.875rem] rounded-md text-sm ">
              Enviar
            </button>
          </div>
        </form>
      ) : (
        <form
          className="mt-8 flex flex-col justify-center "
          onSubmit={(e) => home.updateGame(e)}
        >
          <input
            className="w-full border border-neutral-10 text-neutral-80 py-3 px-4 outline-none rounded-sm  visited:to-blue-400"
            id="nome"
            name="nome"
            type="text"
            placeholder="Nome do jogo"
            required
            disabled
            ref={home.inputElement}
            onChange={(e) => home.setNovoJogo(e.target.value)}
            value={home.JogoAtual}
          />

          <select
            className="mt-4 w-full border border-neutral-10 text-neutral-80  py-3 px-4 outline-none rounded-sm  visited:to-blue-400"
            onChange={(e) => home.setStatusJogo(e.target.value)}
            id="status"
            name="status"
            required
            ref={home.selectElement}
          >
            <option value="Abandonado">ABANDONADO</option>
            <option value="Jogando">JOGANDO</option>
            <option value="Finalizado">FINALIZADO</option>
          </select>
          <div className="btn-container flex justify-end">
            <button className="mt-4 bg-primary-pure flex items-center justify-center w-full lg:w-[200px] h-12 text-white py-4 px-[.875rem] rounded-md text-sm ">
              Enviar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Modal;
