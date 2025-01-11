import {
  Children,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const Context = createContext();

export const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    getCategory();
  }, []);

  async function getCategory() {
    const response = await fetch("http://localhost:5173/api/games/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setCategory(await response.json());
    }
  }

  return (
    <Context.Provider value={{ getCategory, category }}>
      {children}
    </Context.Provider>
  );
};

export function useCategory() {
  const context = useContext(Context);
  if (context == undefined) {
    throw new Error("Category not find");
  }
  return context;
}
