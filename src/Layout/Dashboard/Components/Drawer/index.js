import React from "react";
import {
  Container,
  Logo,
  List,
  ListItem,
  ListItemLink,
  DrawerOverlay
} from "./styles";
import { useSelector, useDispatch } from "react-redux";
import DrawerActions from "Redux/DrawerRedux";
import UserActions from "Redux/UserRedux";

function Drawer() {
  const dispatch = useDispatch();
  const isVisible = useSelector(state => state.drawer.is_visible);

  const drawerClose = () => {
    dispatch(DrawerActions.isVisibleToggle());
  };

  return (
    <>
      <DrawerOverlay isVisible={isVisible} onClick={drawerClose} />
      <Container isVisible={isVisible}>
        <Logo to="/dashboard">FinancesApp</Logo>

        <List>
          <ListItem>
            <ListItemLink to="/revenue" onClick={drawerClose}>
              Receita
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink to="/expenses" onClick={drawerClose}>
              Despesas
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink to="/investments" onClick={drawerClose}>
              Investimentos
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink
              to="/login"
              onClick={() => {
                drawerClose();
                dispatch(UserActions.logout());
              }}
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
