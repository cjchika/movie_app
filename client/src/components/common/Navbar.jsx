import React from "react";
import { useSelector } from "react-redux";

const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector((state) => state.themeMode);
};

const Navbar = () => {
  return <div>Navbar</div>;
};

export default Navbar;
