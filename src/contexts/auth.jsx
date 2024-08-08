import { useState, createContext, useEffect } from "react";
import { auth, db } from "../services/firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signIn = (email, password) => {
    console.log(email, password);
  };

  const signUp = async (name, email, password) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await setDoc(doc(db, "users", uid), {
          nome: name,
          avatarUrl: null,
        }).then(() => {
          let data = {
            uid: uid,
            nome: name,
            email: value.user.email,
            avatarUrl: null,
          };

          setUser(data);
          storageUser(data);
          setLoading(false);
          toast.success("Seja Bem-vindo(a) ao sistema!");
          navigate("/dashboard");
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const storageUser = (data) => {
    localStorage.setItem("tickets", JSON.stringify(data));
  };

  return (
    <AuthContext.Provider
      value={{ signed: !!false, user, signIn, signUp, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
