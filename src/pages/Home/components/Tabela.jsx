import React from 'react'
import { X } from 'phosphor-react'

const Tabela = (props) => {

  return (
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
      {props.jogos.length ? (
        props.jogos.map(({ nome, status, id }) => {
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
                  onClick={(e) => props.deletarJogo(id)}
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
  )
}

export default Tabela