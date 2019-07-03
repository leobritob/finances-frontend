import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #efefef;
  transform: translateX(${props => (props.drawerIsVisible ? 300 : 0)}px);
  transition: all 100ms linear;
`;
