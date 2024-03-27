import React from "react";
import "../styles/Loader.scss";

const Loader = () => {
  return (
    <div className="loader flex col">
      <img src="./logo.png" alt="" />
      <div className="loader-wrap flex">
        <div className="loader-main"></div>
      </div>
    </div>
  );
};

export default Loader;
