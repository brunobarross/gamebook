import React from 'react';
import { X } from 'phosphor-react';
import { HomeContext } from '../contexts/HomeContext';
import { NavLink, Link } from 'react-router-dom';
import { AuthGoogleContext } from '../../../Contexts/AuthGoogle';

const Sidebar = () => {
  const home = React.useContext(HomeContext);
  const { user, signOutGoogle } = React.useContext(AuthGoogleContext);
  return (
    <div
      className={`sidebar ${
        home.sidebarOpen
          ? 'translate-x-0 lg:translate-x-0'
          : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="flex lg:hidden justify-end px-8 pt-4">
        <button className="w-8 h-8 bg-white rounded-full grid place-items-center">
          <X size={24} onClick={() => home.setSideBarOpen(!home.sidebarOpen)} />
        </button>
      </div>

      <div className="logo">
        <Link to="/home">Gamebook</Link>
      </div>
      <ul className="sidebar-lista overflow-y-auto overflow-x-hidden">
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
      </ul>
      <div className="sidebar-footer mt-auto pb-8 pl-4">
        <div className=" flex lg:hidden  items-center gap-3 ">
          <img
            className="w-8 h-8 bg-white border border-white rounded-full grid place-items-center overflow-hidden"
            src={user.photoURL}
          ></img>
          <div className="texto">
            <p className="text-white text-sm font-regular flex flex-col">
              Bem vindo, {user.displayName}
            </p>
            <span
              className="text-white text-xs block w-max  cursor-pointer transition hover:text-neutral-90"
              onClick={signOutGoogle}
            >
              Sair
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
