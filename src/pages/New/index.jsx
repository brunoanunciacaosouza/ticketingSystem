import { FiPlusCircle } from "react-icons/fi";
import Header from "../../components/Header";
import { Title } from "../../components/Title";

import "./new.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import {
  getDocs,
  collection,
  getDoc,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const listRef = collection(db, "customers");

export default function New() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [customerSelected, setCustomerSelected] = useState(0);
  const [loadCustomer, setLoadCustomer] = useState(true);

  const [complemento, setComplemento] = useState('')
  const [assunto, setAssunto] = useState('Suporte')
  const [status, setStatus] = useState('Aberto')
  const [idCustomer, setIdCustomer] = useState(false);

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

          if (id) {
            loadId(lista);
          }
        })
        .catch((error) => {
          console.log("error: ", error);
          setLoadCustomer(false);
          setCustomers([{ id: "1", nomeFantasia: "FREE" }]);
        });
    }

    loadCustomers();
  }, []);

  const loadId = async (lista) => {
    const docRef = doc(db, "chamados", id);
    await getDoc(docRef)
      .then((snapshot) => {
        setAssunto(snapshot.data().assunto);
        setStatus(snapshot.data().status);
        setComplemento(snapshot.data().complemento);

        let index = lista.findIndex(
          (item) => item.id === snapshot.data().clienteId
        );
        setCustomerSelected(index);
        setIdCustomer(true);
      })
      .catch((error) => {
        console.log(error);
        setIdCustomer(false);
      });
  };

  const handleOptionChange = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeSelect = (event) => {
    setAssunto(event.target.value);
    console.log(event.target.value);
  };

  const handleChangeCustomer = (event) => {
    setCustomerSelected(event.target.value);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (idCustomer) {
      const docRef = doc(db, "chamados", id);

      await updateDoc(docRef, {
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        status: status,
        complemento: complemento,
        userId: user.uid,
      })
        .then(() => {
          toast.info("Chamado atualizado com sucesso!");
          setCustomerSelected(0);
          setComplemento("");

          navigate("/dashboard");
        })
        .catch((error) => {
          toast.error("Ops erro ao atualizado o chamado");
        });

      return;
    }

    await addDoc(collection(db, "chamados"), {
      created: new Date(),
      cliente: customers[customerSelected].nomeFantasia,
      clienteId: customers[customerSelected].id,
      assunto: assunto,
      status: status,
      userId: user.uid,
      complemento: complemento,
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
        <Title name={id ? "Editando chamado": "Novo chamado"}>
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
              <option value="Visita Tecnica">Visita Tecnica</option>
              <option value="Financeiro">Financeiro</option>
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
