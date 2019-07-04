import styled from 'styled-components';

export const Container = styled.div`
  width: ${props => (props.drawerIsVisible ? 'calc(100% - 300px)' : '100%')};
  height: 100%;
  background-color: #ffffff;
  transform: translateX(${props => (props.drawerIsVisible ? 300 : 0)}px);
  transition: transform 150ms linear;
`;
