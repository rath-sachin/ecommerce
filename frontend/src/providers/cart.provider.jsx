import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useContext, createContext } from "react";
/**
 * @type{React.Context<{
 *carts:any[]
 * }>}
 */
const Context = createContext();

function CartProvider({ children }) {
  const [carts, setCarts] = useState([]);
  console.log(carts);
  // const loaded = useRef(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("cart", JSON.stringify(carts));
  }, [carts, loaded]);
  useEffect(() => {
    const raw = localStorage.getItem("cart");
    if (!raw) {
      setLoaded(true);
      return;
    }
    setCarts(JSON.parse(raw));
    setLoaded(true);
  }, []);
  function addItem(item) {
    const exist = carts.some((i) => i.id == item.id);
    if (!exist) setCarts([...carts, item]);
  }
  function removeItem(item) {
    setCarts(carts.filter((i) => i.id !== item.id));
    console.log(item);
  }

  return (
    <Context.Provider value={{ carts, addItem, removeItem }}>
      {children}
    </Context.Provider>
  );
}

export default CartProvider;

export function useCart() {
  const context = useContext(Context);
  if (context == undefined) {
    throw new Error("Cart Not Found");
  }
  return context;
}
