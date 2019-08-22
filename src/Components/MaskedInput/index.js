import styled from "styled-components";
import MaskedInput from "react-maskedinput";
import { COLORS } from "Themes";

export default styled(MaskedInput)`
  width: 100%;
  height: 45px;
  padding: 0 10px;
  margin: 5px 0;
  background-color: #ffffff;
  border: none;
  border-bottom: 2px solid #cccccc;
  font-size: 0.9rem;

  &:focus {
    border-color: ${COLORS.primary};
  }
`;
