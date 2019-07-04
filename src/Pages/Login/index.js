import React, { useState, useEffect } from 'react';
import { SEO } from 'Utils';
import {
  Container,
  LoadingContainer,
  LoginForm,
  Input,
  Button
} from './styles';
import { history } from 'Config/Store';
import Title from 'Components/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Login() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    SEO.changeDocumentTitle('Login');
  });

  const login = () => {
    setIsConnected(true);
    setTimeout(() => {
      history.push('/dashboard');
    }, 1500);
  };

  return (
    <Container>
      <LoginForm>
        {!isConnected && (
          <>
            <Title>Painel de Autenticação</Title>
            <Input type="email" placeholder="Digite seu e-mail" />
            <Input type="password" placeholder="Digite sua senha" />
            <Button onClick={login}>Conectar</Button>
          </>
        )}
        {isConnected && (
          <LoadingContainer>
            <FontAwesomeIcon
              icon="circle-notch"
              pulse
              size="lg"
              color="#000000"
            />
          </LoadingContainer>
        )}
      </LoginForm>
    </Container>
  );
}
