import React, { useEffect } from 'react';
import { X } from 'phosphor-react';

const Modal = ({
  setNovoJogo,
  setStatusJogo,
  criarJogo,
  setModalOpen,
  modalOpen,
  inputElement
}) => {
  return (
    <div className="modal-content">
      <div className="modal-header flex items-start justify-between">
        <h3 className="font-medium text-2xl text-neutral-80">Novo Jogo</h3>
        <span
          className="w-8 h-8 grid place-items-center bg-primary-pure-light cursor-pointer"
          onClick={(e) => setModalOpen(!modalOpen)}
        >
          <X size={14} color={'#004993'} className="pointer-events-none" />
        </span>
      </div>
      <form className="mt-8 flex flex-col justify-center " onSubmit={criarJogo}>
        <input
          className="w-full border border-neutral-10 text-neutral-80 py-3 px-4 outline-none rounded-sm  visited:to-blue-400"
          id="nome"
          name="nome"
          type="text"
          placeholder="Nome do jogo"
          required
          ref={inputElement}
          onChange={(e) => setNovoJogo(e.target.value)}
        />
        <select
          className="mt-4 w-full border border-neutral-10 text-neutral-80  py-3 px-4 outline-none rounded-sm  visited:to-blue-400"
          onChange={(e) => setStatusJogo(e.target.value)}
          id="status"
          name="status"
          required
        >
          <option value="abandonado">abandonado</option>
          <option value="jogando">jogando</option>
          <option value="finalizado">finalizando</option>
        </select>
        <div className="btn-container flex justify-end">
          <button className="mt-4 bg-primary-pure flex items-center justify-center w-full lg:w-[200px] h-12 text-white py-4 px-[.875rem] rounded-md text-sm ">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
