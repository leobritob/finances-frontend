import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(${props => (props.dataLength < 4 ? props.dataLength : 4)}, 1fr);
  grid-gap: 20px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;

export const Box = styled.div`
  padding: 20px 10px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor || "#f0f0f0"};
`;

export const Value = styled.p`
  font-weight: bold;
  font-size: 1.8rem;
  color: ${props => props.textColor || "#666666"};
  margin: 0 0 10px 0;
`;

export const Label = styled.p`
  font-size: 0.9rem;
  color: ${props => props.textColor || "#666666"};
`;
