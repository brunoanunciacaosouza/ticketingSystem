import { FiX } from "react-icons/fi";
import "./modal.css";

export default function Modal({ conteudo, close }) {
  return (
    <div className="modal">
      <div className="container">
        <button className="close" onClick={close}>
          <FiX color="#fff" size={25} />
          Voltar
        </button>

        <main>
          <h2>Detalhes do chamado</h2>

          <div className="row">
            <span>
              Cliente: <i>{conteudo.cliente}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Assunto: <i>{conteudo.assunto}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Cadastro em: <i>{conteudo.createdFormat}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Status:{" "}
              <i
              className="status-badge"
                style={{
                  color: "#fff",
                  backgroundColor:
                    conteudo.status === "Aberto" ? "#5cb85c" : "#999",
                }}
              >
                {conteudo.status}
              </i>
            </span>
          </div>

          {conteudo.completo !== "" && (
            <>
              <h3>Complemento</h3>
              <p>{conteudo.complemento}</p>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
