import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  padding: 10px 10px 10px 0;
  margin: 0 0 15px 0;
  background-color: #ffffff;
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

export const Item = styled.li`
  &::after {
    content: "/";
    display: inline;
    margin: 0 10px 0 5px;
    font-size: 0.7rem;
    color: #cccccc;
  }

  &:last-child {
    & > p {
      color: #999999;
    }

    &:after {
      display: none;
    }
  }
`;

export const Link = styled(RouterLink)`
  color: #333333;
  font-size: 0.8rem;

  &:hover {
    color: #999999;
  }
`;

export const Text = styled.p`
  display: inline;
  color: #333333;
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
`;
