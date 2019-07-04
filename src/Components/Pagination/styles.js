import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const List = styled.ul`
  display: flex;
`;

export const Item = styled.li``;

export const ItemLink = styled.a`
  display: block;
  padding: 5px 20px;
  color: #333333;
  border-left: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;

  &::last {
    border-left-width: none;
  }

  &:hover {
    border-color: #eaeaea;
    background-color: #eaeaea;
  }

  ${props =>
    props.isCurrent && ` border-color: #eaeaea; background-color: #eaeaea; `}
`;
