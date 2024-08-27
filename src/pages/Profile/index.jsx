import Header from "../../components/Header";
import { Title } from "../../components/Title";
import "./profile.css";

import { FiSettings } from "react-icons/fi";

export function Profile() {
  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Meu Perfil">
          <FiSettings size={25} />
        </Title>
      </div>

      <h1>pagina perfil</h1>
    </div>
  );
}
