import React, { useState, useEffect } from "react";
import { SEO } from "Utils";
import { Container, LoginForm, Input } from "./styles";
import { history } from "Config/Store";
import Title from "Components/Title";
import Button from "Components/Button";
import FlatButton from "Components/FlatButton";
import Services from "Services";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import UserActions from "Redux/UserRedux";

export default function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = useSelector(state => state.user.token);

  useEffect(() => {
    SEO.changeDocumentTitle("Login");

    if (token) history.push("/dashboard");
  });

  const _login = async () => {
    try {
      const response = await Services.auth.token(email, password);
      if (response.status === 200) {
        dispatch(UserActions.setId(response.data.id));
        dispatch(UserActions.setFirstName(response.data.first_name));
        dispatch(UserActions.setLastName(response.data.last_name));
        dispatch(UserActions.setToken(response.data.token));
        history.push("/dashboard");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <Container>
      <LoginForm>
        <Title>Painel de Autenticação</Title>
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          onChange={e => setPassword(e.target.value)}
        />
        <FlatButton label="Esqueci minha senha" href="/forgot-password" />
        <Button label="Conectar" allowSpinnerLoading={true} onClick={_login} />
      </LoginForm>
    </Container>
  );
}
