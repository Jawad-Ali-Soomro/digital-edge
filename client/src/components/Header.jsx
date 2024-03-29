import React from "react";
import "../styles/Header.scss";
import { BiHeart, BiMenu, BiPlus, BiSearch, BiStats, BiUser } from 'react-icons/bi'

const Header = () => {
  return (
    <div className="header-main flex">
      <div className="logo">
        <img src="./logo.png" alt="" />
      </div>
      <div className="navs flex">
        <ul className="flex">
            <li className="flex" data-after="Create "><BiPlus /></li>
            <li className="flex" data-after="Liked"><BiHeart /></li>
            <li className="flex" data-after="Search"><BiSearch /></li>
            <li className="flex" data-after="Statistics"><BiStats /></li>
            <li className="flex" data-after="Profile"><BiUser /></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
