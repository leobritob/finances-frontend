import styled from "styled-components";
import { COLORS } from "Themes";
import chroma from "chroma-js";

export const Container = styled.button`
  height: ${props => props.height || 40}px;
  color: ${props => props.color || "#ffffff"};
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
    background-color: ${props =>
      chroma(props.backgroundColor || COLORS.primary)
        .alpha(0.8)
        .css()};
  }

  ${props => (props.noMargin ? "margin: 0;" : null)}
  ${props => (props.noPadding ? "padding: 0;" : null)};
`;

export const Span = styled.span`
  font-size: 0.8rem;
  color: ${props => props.color || "#ffffff"};
`;
