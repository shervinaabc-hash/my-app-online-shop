import React from "react";
import Navbar from "./Navbar";

type Tlayoutproops = {
  children: React.ReactNode;
};
function Layout({ children }: Tlayoutproops) {
  return (
    <>
      <Navbar />
      
      <div>{children}</div>
    </>
  );
}

export default Layout;
