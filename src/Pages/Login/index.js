import React, { useState, useEffect } from 'react';
import { SEO } from 'Utils';
import { Container, LoginForm } from './styles';
import { history } from 'Config/Store';
import Title from 'Components/Title';
import Input from 'Components/Input';
import Button from 'Components/Button';
import FlatButton from 'Components/FlatButton';
import Services from 'Services';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import UserActions from 'Redux/UserRedux';

export default function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let _emailText = null;
  let _passwordText = null;

  const token = useSelector(state => state.user.token);

  useEffect(() => {
    SEO.changeDocumentTitle('Login');
  }, []);

  useEffect(() => {
    if (_emailText) {
      _emailText.focus();
    }

    if (token) history.push('/dashboard');
  }, [_emailText, token]);

  const _login = async () => {
    try {
      const response = await Services.auth.token(email, password);
      if (response.status === 200) {
        dispatch(UserActions.setId(response.data.id));
        dispatch(UserActions.setFirstName(response.data.first_name));
        dispatch(UserActions.setLastName(response.data.last_name));
        dispatch(UserActions.setToken(response.data.token));
        history.push('/dashboard');
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  function _onKeyPress(context, e) {
    if (context === 'email') {
      if (e.key === 'Enter') {
        _passwordText.focus();
      }
    }

    if (context === 'password') {
      if (e.key === 'Enter') {
        _login();
      }
    }
  }

  return (
    <Container>
      <LoginForm>
        <Title>Painel de Autenticação</Title>
        <Input
          ref={ref => (_emailText = ref)}
          type="email"
          placeholder="Digite seu e-mail"
          onChange={e => setEmail(e.target.value)}
          onKeyPress={e => _onKeyPress('email', e)}
        />
        <Input
          ref={ref => (_passwordText = ref)}
          type="password"
          placeholder="Digite sua senha"
          onChange={e => setPassword(e.target.value)}
          onKeyPress={e => _onKeyPress('password', e)}
        />
        <FlatButton label="Esqueci minha senha" href="/forgot-password" />
        <Button styleButton="primary" label="Conectar" allowSpinnerLoading={true} onClick={() => _login()} />
      </LoginForm>
    </Container>
  );
}
