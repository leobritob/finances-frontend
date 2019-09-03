import React, { useEffect } from 'react';
import { SEO } from 'Utils';
import { Container, LoginForm } from './styles';
import Title from 'Components/Title';
import Input from 'Components/Input';
import Button from 'Components/Button';
import FlatButton from 'Components/FlatButton';

export default function ForgotPassword() {
  let _emailText = null;

  useEffect(() => {
    SEO.changeDocumentTitle('Esqueci minha senha');
  }, []);

  useEffect(() => {
    if (_emailText) {
      _emailText.focus();
    }
  }, [_emailText]);

  return (
    <Container>
      <LoginForm>
        <Title>Esqueci minha senha</Title>
        <Input ref={ref => (_emailText = ref)} type="email" placeholder="Digite seu e-mail" />
        <FlatButton label="Ir para login" href="/login" />
        <Button styleButton="primary" label="Enviar" allowSpinnerLoading={true} />
      </LoginForm>
    </Container>
  );
}
