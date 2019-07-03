import styled from 'styled-components';

export const H1 = styled.h1`
  font-size: 1.2rem;
  color: #666666;
  margin-bottom: 10px;

  &::after {
    content: ' ';
    display: block;
    border-bottom: 4px solid ${props => props.borderColor || '#1e90ff'};
    width: 50px;
    margin: 5px 0;
  }
`;
