import Header from "../../components/Header";
import { Title } from "../../components/Title";
import "./profile.css";

import { FiSettings, FiUpload } from "react-icons/fi";
import avatarImg from "../../assets/avatar.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../services/firebaseConnection";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { toast } from "react-toastify";

export function Profile() {
  const { user, storageUser, setUser, logout } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);
  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);

  const handleFile = (event) => {
    if (event.target.files[0]) {
      const image = event.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(image));
      } else {
        alert("Envie uma imagem do tipo jpeg ou png");
        setImageAvatar(null);
        return;
      }
    }
  };

  const handleUpload = async () => {
    const currentUid = user.uid;

    const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`);

    const uploadTask = uploadBytes(uploadRef, imageAvatar).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (downloadURL) => {
        let urlFoto = downloadURL;

        const docRef = doc(db, "users", currentUid);
        await updateDoc(docRef, {
          avatarUrl: urlFoto,
          nome: nome,
        }).then(() => {
          let data = {
            ...user,
            nome: nome,
            avatarUrl: urlFoto,
          };

          setUser(data);
          storageUser(data);
          toast.success("Atualizado com sucesso!");
        });
      });
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (imageAvatar === null && nome !== "") {
      const docRef = doc(db, "users", user.uid);

      await updateDoc(docRef, {
        nome: nome,
      }).then(() => {
        let data = {
          ...user,
          nome: nome,
        };

        setUser(data);
        storageUser(data);
        toast.success("Atualizado com sucesso!");
      });
    } else if (nome !== "" && imageAvatar !== null) {
      await handleUpload();
    }
  };

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Meu Perfil">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>

              <input type="file" accept="image/*" onChange={handleFile} />
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
            <input
              type="text"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />

            <label>Email</label>
            <input type="text" value={email} disabled={true} />

            <button type="submit">Salvar</button>
          </form>
        </div>

        <div className="container">
          <button className="logout-btn" onClick={() => logout()}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
