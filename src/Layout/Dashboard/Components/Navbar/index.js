import React from "react";
import { Container, MenuButton, List, ListItem, ListItemLink } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DrawerActions from "Redux/DrawerRedux";

function Navbar() {
  const dispatch = useDispatch();
  const drawerIsVisible = useSelector(state => state.drawer.is_visible);
  function drawerToggle() {
    dispatch(DrawerActions.isVisibleToggle());
  }

  return (
    <Container drawerIsVisible={drawerIsVisible}>
      <MenuButton onClick={drawerToggle}>
        <FontAwesomeIcon icon="bars" color="#ffffff" />
      </MenuButton>
      <List>
        <ListItem>
          <ListItemLink to="/dashboard">Dashboard</ListItemLink>
        </ListItem>
      </List>
    </Container>
  );
}

export default Navbar;
