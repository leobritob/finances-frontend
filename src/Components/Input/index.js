import styled from 'styled-components';
import { COLORS } from 'Themes';

export default styled.input`
  width: 100%;
  height: 45px;
  padding: 0 10px;
  margin: 5px 0;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  font-size: 0.9rem;
  transition: all 120ms linear;

  &:hover {
    border-color: #999999;
  }

  &:focus {
    border-color: ${COLORS.primary};
    box-shadow: 0 0 0 1px ${COLORS.primary};
  }
`;
