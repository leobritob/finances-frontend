import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  cursor: pointer;
  display: block;
  margin: 5px 0;
  font-size: 0.8rem;
  color: ${props => props.color || '#333333'};
`;
