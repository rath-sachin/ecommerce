import {
  Children,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const Context = createContext();

export const GameProvider = ({ children }) => {
  const [game, setGame] = useState([]);
  const [isloading, setIsloading] = useState();
  useEffect(() => {
    getGame();
  }, []);

  async function getGame() {
    setIsloading(true);
    const response = await fetch("http://localhost:5173/api/games", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setGame(await response.json());
      setIsloading(false);
    } else {
      setIsloading(true);
    }
  }

  return (
    <Context.Provider value={{ getGame, game }}>{children}</Context.Provider>
  );
};

export function useGame() {
  const context = useContext(Context);
  if (context == undefined) {
    throw new Error("Game not inserted");
  }
  return context;
}
