import styled from "styled-components";
import { COLORS } from "Themes";

export default styled.input`
  width: 100%;
  height: 45px;
  padding: 0 10px;
  margin: 5px 0;
  background-color: #ffffff;
  border-left-width: 0;
  border-top-width: 0;
  border-right-width: 0;
  border-bottom-width: 2px;
  border-bottom-color: #cccccc;
  font-size: 0.9rem;

  &:focus {
    border-left-width: 0;
    border-top-width: 0;
    border-right-width: 0;
    border-color: ${COLORS.primary};
  }
`;
