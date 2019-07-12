import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS } from 'Themes';

export const DrawerOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${props => (props.isVisible ? 9 : -1)};
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transition: opacity 50ms ease-in;
`;

export const Container = styled.div`
  width: 300px;
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  top: 0;
  transform: translateX(${props => (props.isVisible ? 0 : -300)}px);
  transition: transform 100ms ease-in;
  z-index: 10;
  background-color: #ffffff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
`;

export const Logo = styled(Link)`
  width: 100%;
  display: block;
  text-align: center;
  line-height: 50px;
  font-size: 1.2rem;
  background-color: ${COLORS.primary};
  color: #ffffff;
`;

export const List = styled.ul`
  display: block;
`;

export const ListItem = styled.li``;

export const ListItemLink = styled(Link)`
  display: block;
  padding: 0 20px;
  line-height: 50px;
  font-size: 0.9rem;
  color: #333333;

  &:hover {
    color: ${COLORS.primary};
  }
`;
