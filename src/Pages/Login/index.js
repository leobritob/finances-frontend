import React, { useEffect } from 'react';
import { SEO } from 'Utils';
import { Container, LoginForm, Input } from './styles';
import { history } from 'Config/Store';
import Title from 'Components/Title';
import Button from 'Components/Button';
import FlatButton from 'Components/FlatButton';
import { toast } from 'react-toastify';

export default function Login() {
  useEffect(() => {
    SEO.changeDocumentTitle('Login');
  });

  const login = () => {
    setTimeout(() => {
      history.push('/dashboard');
      toast.success('Login realizado com sucesso');
    }, 1500);
  };

  return (
    <Container>
      <LoginForm>
        <Title>Painel de Autenticação</Title>
        <Input type="email" placeholder="Digite seu e-mail" />
        <Input type="password" placeholder="Digite sua senha" />
        <FlatButton label="Esqueci minha senha" href="/forgot-password" />
        <Button label="Conectar" allowSpinnerLoading={true} onClick={login} />
      </LoginForm>
    </Container>
  );
}
