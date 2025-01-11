import React, { useEffect } from "react";
import CartItem from "../components/cartitem";
import { useCart } from "../providers/cart.provider";
import { toast } from "react-toastify";

function Cart() {
  const carts = useCart();
  if (!carts.carts.length) {
    return (
      <div className="justify-center flex items-center">
        <div className="mt-auto mb-auto border-dashed border to-black">
          Cart is Empty
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid-cols-1 grid gap-10 m-10 justify-center">
        {carts.carts.map((game) => (
          <CartItem
            key={game.id}
            imageurl={game.image}
            name={game.name}
            description={game.description}
            price={game.price}
            rating={100 - game.rating * 10}
            rating2={game.rating}
            HandleRemoveFromCart={() => {
              carts.removeItem(game);
              toast("Removed");
            }}
          />
        ))}
      </div>
      <div className="text-black font-bold sticky bottom-0 bg-white shadow-[0px_-1px_5px_0px] shadow-gray-500/40 px-8 py-2 flex justify-between text-center items-center">
        <div className="flex gap-5 items-center">
          <div className="">TOTAL PRICE</div>
          <div>
            {carts.carts.reduce((a, c) => {
              return a + c.price;
            }, 0)}
          </div>
        </div>
        <button className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
