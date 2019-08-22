import styled from "styled-components";
import { COLORS } from "Themes";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
`;

export const LoginForm = styled.div`
  max-width: 400px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  background-color: #efefef;
`;

export const Input = styled.input`
  width: 100%;
  height: 45px;
  padding: 0 10px;
  margin: 5px 0;
  background-color: #ffffff;
  font-size: 0.8rem;
  border: none;
`;

export const Button = styled.button`
  display: block;
  width: 100%;
  margin: 5px 0;
  padding: 15px 20px;
  background-color: ${COLORS.primary};
  color: #ffffff;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #3a9eff;
  }
`;
