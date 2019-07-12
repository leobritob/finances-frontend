import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #efefef;
  font-size: 0.9rem;
  color: #333333;
`;

export const Button = styled.button`
  background-color: ${props => props.backgroundColor || '#ffffff'};
  padding: 10px 25px;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  ${props =>
    props.noBorder
      ? null
      : `
    border-top: 1px solid #eaeaea;
    border-right: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
  `};

  color: ${props => props.textColor || '#333333'};

  &:hover {
    background-color: #eaeaea;
  }
`;
