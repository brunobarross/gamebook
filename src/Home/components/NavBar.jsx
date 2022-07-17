import React from 'react';
import { List } from 'phosphor-react';
import {Link } from "react-router-dom";
import { HomeContext } from '../contexts/HomeContext';

const Navbar = () => {
const home = React.useContext(HomeContext)
  return (
    <div className="h-16 flex justify-between md:hidden px-4 items-center bg-primary-700 text-white w-full border-b border-neutral-10">
      <div className="logo">
        <Link to='/' className='text-neutral-90 text-2xl font-semibold'>Gamebook</Link>
      </div>
      <button
        className={`w-10 h-10 bg-white border border-gray-20 rounded-full grid place-items-center transition-opacity ${
          home.sidebarOpen ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={() => home.setSideBarOpen(!home.sidebarOpen)}
      >
        <List size={24} color="#000" />
      </button>
    </div>
  );
};

export default Navbar;