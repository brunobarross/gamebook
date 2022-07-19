import React, { useContext } from 'react';
import { Trash, Pen } from 'phosphor-react';
import { HomeContext } from './HomeContext';

export const TabelaContext = React.createContext();

export const TabelaStorage = ({ children }) => {
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
            onClick={(e) => home.deletarJogo(row.id)}
          >
            <Trash size={16} color="#fff" />
          </button>
          <button
            className=" grid place-items-center w-8 h-8 bg-primary-pure-40 rounded-[4px] ml-4 "
            id={row.id}
            onClick={(e) => home.handleClickEditButton(row.id)}
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

  const home = React.useContext(HomeContext);

  return (
    <TabelaContext.Provider
      value={{ columns, conditionalRowStyles, customStyles }}
    >
      {children}
    </TabelaContext.Provider>
  );
};
