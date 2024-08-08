import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = (email, password) => {
    console.log(email, password);
  };

  return (
    <AuthContext.Provider value={{ signed: !!false, user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
