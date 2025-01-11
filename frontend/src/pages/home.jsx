import React from "react";
import { useGame } from "../providers/game.provider";
import GCard from "../components/gcard";
import { useCart } from "../providers/cart.provider";

function Home() {
  const { game: games } = useGame();

  const cart = useCart();

  return (
    <div className="grid-cols-3 grid gap-10 m-10 justify-center">
      {games.map((game) => (
        <GCard
          key={game.id}
          imageurl={game.image}
          name={game.name}
          description={game.description}
          price={game.price}
          rating={game.rating}
          HandleAddToCart={() => cart.addItem(game)}
        />
      ))}
    </div>
  );
}

export default Home;
