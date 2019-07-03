import React from 'react';
import { Container, Logo, List, ListItem, ListItemLink } from './styles';
import { useSelector } from 'react-redux';

function Drawer() {
  const isVisible = useSelector(state => state.drawer.is_visible);
  return (
    <Container isVisible={isVisible}>
      <Logo to="/dashboard">FinancesApp</Logo>

      <List>
        <ListItem>
          {' '}
          <ListItemLink> Receita </ListItemLink>{' '}
        </ListItem>
        <ListItem>
          {' '}
          <ListItemLink> Despesas </ListItemLink>{' '}
        </ListItem>
        <ListItem>
          {' '}
          <ListItemLink> Investimentos </ListItemLink>{' '}
        </ListItem>
      </List>
    </Container>
  );
}

export default Drawer;
