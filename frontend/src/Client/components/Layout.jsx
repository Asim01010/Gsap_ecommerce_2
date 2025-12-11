import React from "react";
import ChatWidget from "./ChatWidget";

const Layout = ({ children }) => {
  return (
    <>
      {children}
      <ChatWidget />
    </>
  );
};

export default Layout;
