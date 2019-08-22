import React from "react";
import { Container } from "./styles";
import Navbar from "./Components/Navbar";
import Drawer from "./Components/Drawer";

function DashboardLayout({ children }) {
  return (
    <>
      <Drawer />
      <Container>
        <Navbar />
        {children}
      </Container>
    </>
  );
}

export default DashboardLayout;
