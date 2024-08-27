import { useState, createContext, useEffect } from "react";
import { auth, db } from "../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPrivate, setLoadingPrivate] = useState(true);

  useEffect(() => {
    async function loadUser(){
      const storageUser = localStorage.getItem('tickets')

      if(storageUser){
        setUser(JSON.parse(storageUser))
        setLoadingPrivate(false);
      }


      setLoadingPrivate(false);

    }

    loadUser();
  }, [])

  const signIn = async (email, password) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        let data = {
          uid: uid,
          nome: docSnap.data().nome,
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl
        };

        console.log(data)

        setUser(data);
        storageUser(data);
        setLoading(false);
        toast.success("Bem vindo(a) de volta!");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ops algo deu errado!");
        setLoading(false);
      });
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

 
  async function logout(){
    await signOut(auth);
    localStorage.removeItem('tickets');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        logout,
        storageUser,
        setUser,
        loading,
        loadingPrivate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
