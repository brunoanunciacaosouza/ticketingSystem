import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import "./signin.css";

import { AuthContext } from "../../contexts/auth";

export default function SignIn() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email !== "" && password !== "") {
      signIn(email, password);
    }
  };

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo sistema de chamados" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <input
            type="text"
            placeholder="email@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">Acessar</button>
        </form>

        <Link to="/register">Criar uma conta</Link>
      </div>
    </div>
  );
}
