import styled from 'styled-components';
import { COLORS } from 'Themes';

export const Container = styled.button`
  height: ${props => props.height || 47}px;
  color: ${props => props.color || '#ffffff'};
  background-color: ${props => props.backgroundColor || COLORS.primary};
  padding: 0 20px;
  margin: 10px 0;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${props => props.backgroundColorHover || '#0e65ba'};
  }
`;
