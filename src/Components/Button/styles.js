import styled from 'styled-components';
import chroma from 'chroma-js';

export const Container = styled.button`
  height: ${props => props.height || 45}px;
  background-color: ${props => props.backgroundColor};
  padding: 0 20px;
  margin: 0 0 10px 0;
  font-size: 1rem;
  border-width: ${props => props.boderWidth || 1}px;
  border-style: solid;
  border-color: ${props => props.borderColor};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 120ms linear;

  ${props => (props.noMargin ? 'magin: 0 !important;' : '')}

  ${props => (props.margin ? `margin: ${props.margin};` : '')}

  &:hover {
    border-color: ${props =>
      chroma(props.borderColor)
        .alpha(0.8)
        .css()};
    background-color: ${props =>
      chroma(props.backgroundColor)
        .alpha(0.8)
        .css()};
  }

  &:active {
    border-color: ${props => props.activeBoxShadow};
    box-shadow: 0 0 0 1px ${props => props.activeBoxShadow};
  }

  ${props => (props.noMargin ? 'margin: 0;' : null)}
  ${props => (props.noPadding ? 'padding: 0;' : null)};
  ${props => (props.noBorder ? 'border: 0;' : null)};
`;

export const Span = styled.span`
  font-size: 0.9rem;
  color: ${props => props.color || '#333333'};
`;
