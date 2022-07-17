import React from 'react';

const Sidebar = () => {
  return (
    <div className={`sidebar`}>
      <div className="flex md:hidden justify-end px-8 pt-4">
        <button className="w-8 h-8 bg-white rounded-full grid place-items-center">
          {/* <X size={24} onClick={() => setSideBarOpen(!sidebarOpen)} /> */}
        </button>
      </div>

      <div className="logo">
        <p>Gamebook</p>
      </div>
      <ul className="sidebar-lista overflow-y-auto overflow-x-hidden">
        <li>Oi</li>
      </ul>
    </div>
  );
};

export default Sidebar;
