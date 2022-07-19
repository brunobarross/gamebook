import React from 'react';
import { List } from 'phosphor-react';
import { Link } from 'react-router-dom';
import { HomeContext } from '../contexts/HomeContext';
import { AuthGoogleContext } from '../../../Contexts/AuthGoogle';

const Navbar = () => {
  const home = React.useContext(HomeContext);
  const { signOutGoogle, user } = React.useContext(AuthGoogleContext);

  return (
    <div className="h-16 flex justify-between  px-4 items-center bg-primary-700 text-white w-full border-b border-neutral-10">
      <div className="logo md:hidden">
        <Link to="/" className="text-neutral-90 text-2xl font-semibold">
          Gamebook
        </Link>
      </div>

      <button
        className={` md:hidden w-10 h-10 bg-white border border-gray-20 rounded-full grid place-items-center transition-opacity ${
          home.sidebarOpen ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={() => home.setSideBarOpen(!home.sidebarOpen)}
      >
        <List size={24} color="#000" />
      </button>
      <div className=" hidden lg:flex items-center gap-2 ml-auto">
        <div className="texto">
          <p className="text-neutral-90 text-sm font-regular flex flex-col">
            Bem vindo, {user.displayName}
          </p>
          <span
            className="text-neutral-90 text-xs block  w-max ml-auto cursor-pointer transition hover:text-primary-pure"
            onClick={signOutGoogle}
          >
            Sair
          </span>
        </div>

        <img
          className="w-10 h-10 bg-white border border-gray-20 rounded-full grid place-items-center overflow-hidden"
          src={user.photoURL}
        ></img>
      </div>
    </div>
  );
};

export default Navbar;
