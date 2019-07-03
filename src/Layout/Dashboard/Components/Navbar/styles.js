import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: #333333;
  padding: 0 20px;
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
