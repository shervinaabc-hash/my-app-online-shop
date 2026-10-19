import React from "react";
import Navbar from "./Navbar";
import Footer from "./footer";

type Tlayoutproops = {
  children: React.ReactNode;
};
function Layout({ children }: Tlayoutproops) {
  return (
    <>
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </>
  );
}

export default Layout;
