import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: #333333;
  display: flex;
  flex-direction: row;
`;

export const MenuButton = styled.div`
  height: 50px;
  display: flex;
  padding: 0 20px;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #3f3f3f;
  }
`;

export const List = styled.ul`
  display: flex;
`;

export const ListItem = styled.li``;

export const ListItemLink = styled(Link)`
  display: block;
  padding: 0 20px;
  line-height: 50px;
  font-size: 0.9rem;
  color: #ffffff;

  &:hover {
    background-color: #3f3f3f;
  }
`;
