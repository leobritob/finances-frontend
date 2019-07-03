import React from 'react';
import { Container } from './styles';
import Navbar from './Components/Navbar';
import Drawer from './Components/Drawer';
import { useSelector } from 'react-redux';

function DashboardLayout({ children }) {
  const drawerIsVisible = useSelector(state => state.drawer.is_visible);
  return (
    <>
      <Drawer />
      <Container drawerIsVisible={drawerIsVisible}>
        <Navbar />
        {children}
      </Container>
    </>
  );
}

export default DashboardLayout;
