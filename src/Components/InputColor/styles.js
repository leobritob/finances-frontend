import styled from 'styled-components';

export const Swatch = styled.div`
  width: 70px;
  height: 35px;
  padding: 10px;
  margin: 5px 0;
  background-color: #ffffff;
  border-bottom: 2px solid #cccccc;
  cursor: pointer;
`;

export const Color = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background-color: ${props => props.color};
`;

export const Container = styled.div`
  position: absolute;
  z-index: 2;
`;
