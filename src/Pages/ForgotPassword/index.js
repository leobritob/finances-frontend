import React, { useEffect } from 'react';
import { SEO } from 'Utils';
import { Container, LoginForm, Input } from './styles';
import Title from 'Components/Title';
import Button from 'Components/Button';
import FlatButton from 'Components/FlatButton';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  useEffect(() => {
    SEO.changeDocumentTitle('Esqueci minha senha');
  });

  const send = () => {
    toast.success('Foi enviado uma mensagem para o seu e-mail');
  };

  return (
    <Container>
      <LoginForm>
        <Title>Esqueci minha senha</Title>
        <Input type="email" placeholder="Digite seu e-mail" />
        <FlatButton label="Ir para login" href="/login" />
        <Button label="Enviar" allowSpinnerLoading={true} onClick={send} />
      </LoginForm>
    </Container>
  );
}
