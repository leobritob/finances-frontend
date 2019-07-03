import React from 'react';
import { Container, List, ListItem, ListItemLink } from './styles';

function Navbar() {
  return (
    <Container>
      <List>
        <ListItem>
          <ListItemLink to="/dashboard">Dashboard</ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemLink to="/dashboard">Sobre</ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemLink to="/dashboard">Contato</ListItemLink>
        </ListItem>
      </List>
    </Container>
  );
}

export default Navbar;
