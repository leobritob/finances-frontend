import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-columns: ${props =>
    `repeat(${props.children.length}, 1fr)` || '1fr'};
  grid-gap: 20px;
  flex-direction: row;

  @media (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;
