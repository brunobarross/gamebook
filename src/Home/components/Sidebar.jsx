import React from "react";
import { X } from "phosphor-react";
import { HomeContext } from "../contexts/HomeContext";
import { NavLink, Link } from "react-router-dom";

const Sidebar = () => {
  const home = React.useContext(HomeContext);
  return (
    <div
      className={`sidebar ${
        home.sidebarOpen
          ? "translate-x-0 lg:translate-x-0"
          : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="flex lg:hidden justify-end px-8 pt-4">
        <button className="w-8 h-8 bg-white rounded-full grid place-items-center">
          <X size={24} onClick={() => home.setSideBarOpen(!home.sidebarOpen)} />
        </button>
      </div>

      <div className="logo">
        <Link to='/'>Gamebook</Link>
       
      </div>
      <ul className="sidebar-lista overflow-y-auto overflow-x-hidden">
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
     
      </ul>
    </div>
  );
};

export default Sidebar;
