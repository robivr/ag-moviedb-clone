import React from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="filter_card">
        <span>Sort</span>
        <AiOutlineRight />
      </div>
      <div className="filter_card">
        Filters
        <AiOutlineRight />
      </div>
      <div className="filter_card">
        <span>Where To Watch</span>
        <AiOutlineRight />
      </div>
      <div className="filter_button filter_button_inactive">Search</div>
    </div>
  );
};

export default Sidebar;
