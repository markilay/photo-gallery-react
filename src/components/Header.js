import React, { useState } from "react";
import Liked from "./Liked";

const Header = () => {
  return (
    <div className="header">
      <h1>#photoGallery</h1>
      <div className="my-panel">
        <Liked />
      </div>
    </div>
  );
};

export default Header;
