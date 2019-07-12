import React from 'react';
import {
  Container,
  Logo,
  List,
  ListItem,
  ListItemLink,
  DrawerOverlay
} from './styles';
import { useSelector, useDispatch } from 'react-redux';
import DrawerActions from 'Redux/DrawerRedux';

function Drawer() {
  const dispatch = useDispatch();
  const isVisible = useSelector(state => state.drawer.is_visible);
  return (
    <>
      <DrawerOverlay
        isVisible={isVisible}
        onClick={() => dispatch(DrawerActions.isVisibleToggle())}
      />
      <Container isVisible={isVisible}>
        <Logo to="/dashboard">FinancesApp</Logo>

        <List>
          <ListItem>
            <ListItemLink
              to="/revenue"
              onClick={() => dispatch(DrawerActions.isVisibleToggle())}
            >
              Receita
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink
              to="/expenses"
              onClick={() => dispatch(DrawerActions.isVisibleToggle())}
            >
              Despesas
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink
              to="/investments"
              onClick={() => dispatch(DrawerActions.isVisibleToggle())}
            >
              Investimentos
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink
              to="/login"
              onClick={() => dispatch(DrawerActions.isVisibleToggle())}
            >
              Sair
            </ListItemLink>
          </ListItem>
        </List>
      </Container>
    </>
  );
}

export default Drawer;
