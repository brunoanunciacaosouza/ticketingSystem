import { FiPlusCircle } from "react-icons/fi";
import Header from "../../components/Header";
import { Title } from "../../components/Title";

import "./new.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { getDocs, collection, getDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { toast } from "react-toastify";

const listRef = collection(db, "customers");

export default function New() {
  const { user } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);
  const [customerSelected, setCustomerSelected] = useState(0);
  const [loadCustomer, setLoadCustomer] = useState(true);
  const [complemento, setComplemento] = useState("");
  const [assunto, setAssunto] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function loadCustomers() {
      const querySnapshot = await getDocs(listRef)
        .then((snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia,
            });
          });

          if (snapshot.docs.size === 0) {
            setCustomers([{ id: "1", nomeFantasia: "FREE" }]);
            setLoadCustomer(false);
            return;
          }

          setCustomers(lista);
          setLoadCustomer(false);
        })
        .catch((error) => {
          console.log("error: ", error);
          setLoadCustomer(false);
          setCustomers([{ id: "1", nomeFantasia: "FREE" }]);
        });
    }

    loadCustomers();
  }, []);

  const handleOptionChange = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeSelect = (event) => {
    setAssunto(event.target.value);
  };

  const handleChangeCustomer = (event) => {
    setCustomerSelected(event.target.value);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    await addDoc(collection(db, "chamados"), {
      created: new Date(),
      cliente: customers[customerSelected].nomeFantasia,
      clienteId: customers[customerSelected].id,
      assunto: assunto,
      status: status,
      userId: user.uid,
    })
      .then(() => {
        toast.success("Chamado Registrado!");
        setComplemento("");
        setCustomerSelected(0);
      })
      .catch((error) => {
        toast.error("Ops erro ao registrar, tente mais tarde!");
      });
  };

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Novo chamado">
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Clientes</label>
            {loadCustomer ? (
              <input type="text" disabled={true} value="carregando..." />
            ) : (
              <select value={customerSelected} onChange={handleChangeCustomer}>
                {customers.map((item, index) => {
                  return (
                    <option value={index} key={index}>
                      {item.nomeFantasia}
                    </option>
                  );
                })}
              </select>
            )}

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
