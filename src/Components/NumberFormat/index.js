import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { COLORS } from 'Themes';

export default styled(NumberFormat)`
  width: 100%;
  height: 45px;
  margin: 0 0 10px 0;
  padding: 0 10px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  font-size: 0.9rem;
  transition: all 120ms linear;

  ${props =>
    !props.noMargin && props.margin ? `margin: ${props.margin};` : ''}

  ${props => (props.noMargin ? 'margin: 0 !important;' : '')}

&:hover {
    border-color: #999999;
  }

  &:focus {
    border-color: ${COLORS.primary};
    box-shadow: 0 0 0 1px ${COLORS.primary};
  }
`;
