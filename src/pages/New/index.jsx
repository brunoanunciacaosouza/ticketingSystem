import { FiPlusCircle } from "react-icons/fi";
import Header from "../../components/Header";
import { Title } from "../../components/Title";

import "./new.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

const listRef = collection(db, "customers");

export default function New() {
  const { user } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);
  const [loadCustomer, setLoadCustomer] = useState(true);
  const [complemento, setComplemento] = useState("");
  const [assunto, setAssunto] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function loadCustomers(){
        const querySnapshot = await getDocs(listRef);
    }

    loadCustomers();
  }, []);

  const handleOptionChange = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeSelect = (event) => {
    setAssunto(event.target.value);
  };

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Novo chamado">
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">
          <form className="form-profile">
            <label>Clientes</label>
            <select name="" id="">
              <option value="1">Mercado Teste</option>
              <option value="1">Loja</option>
            </select>

            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Técnica">Loja</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Aberto"
                onChange={handleOptionChange}
                checked={status === "Aberto"}
              />
              <span>Em Aberto</span>

              <input
                type="radio"
                name="radio"
                value="Progresso"
                onChange={handleOptionChange}
                checked={status === "Progresso"}
              />
              <span>Progresso</span>

              <input
                type="radio"
                name="radio"
                value="Atendido"
                onChange={handleOptionChange}
                checked={status === "Atendido"}
              />
              <span>Atendido</span>
            </div>

            <label>Complemento</label>

            <textarea
              placeholder="Descreva o seu problema(opcional)."
              value={complemento}
              onChange={(event) => setComplemento(event.target.value)}
            ></textarea>

            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
