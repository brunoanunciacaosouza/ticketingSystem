import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import { AuthContext } from "../../contexts/auth";

export default function SignUp() {
  const { signUp, loading } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name !== "" && email !== "" && password !== "") {
      await signUp(name, email, password);
    }
  };

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo sistema de chamados" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastrar conta</h1>
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

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

          <button type="submit">
            {loading ? "Carregando..." : "Cadastrar"}
          </button>
        </form>

        <Link to="/">Já possui uma conta? Faça login</Link>
      </div>
    </div>
  );
}
