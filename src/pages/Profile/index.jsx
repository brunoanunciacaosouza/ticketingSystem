import Header from "../../components/Header";
import { Title } from "../../components/Title";
import "./profile.css";

import { FiSettings, FiUpload } from "react-icons/fi";
import avatarImg from "../../assets/avatar.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

export function Profile() {
  const { user } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Meu Perfil">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile">
            <label className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>

              <input type="file" accept="image/*" />
              <br />

              {avatarUrl === null ? (
                <img
                  src={avatarImg}
                  alt="foto de perfil"
                  width={250}
                  height={250}
                />
              ) : (
                <img
                  src={avatarUrl}
                  alt="foto do perfil"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <label>Nome</label>
            <input type="text" name="" id="" placeholder="Seu nome" />

            <label>Email</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Seu email"
              disabled={true}
            />

            <button type="submit">Salvar</button>
          </form>
        </div>

        <div className="container">
          <button className="logout-btn">Sair</button>
        </div>
      </div>
    </div>
  );
}
