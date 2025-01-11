import { Children, createContext, useContext, useState } from "react";
import { useEffect } from "react";

const Context = createContext();

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    state: "loading", // "loading" | "unauthenticated" | "authenticated"
    user: undefined,
  });
  function logout() {
    setState({ user: null, state: "unauthenticated" });
  }
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    setState({ user: undefined, state: "loading" });
    const response = await fetch("http://localhost:5173/api/users/@me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setState({ user: await response.json(), state: "authenticated" });
    } else {
      setState({ user: null, state: "unauthenticated" });
    }
  }

  return (
    <Context.Provider value={{ ...state, getUser, logout }}>
      {children}
    </Context.Provider>
  );
};

export function useAuth() {
  const context = useContext(Context);
  if (context == undefined) {
    throw new Error("Useauth must be used in auth provider");
  }
  return context;
}
