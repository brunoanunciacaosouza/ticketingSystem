import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import "./signin.css";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo sistema de chamados" />
        </div>

        <form>
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
