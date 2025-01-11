import React from "react";
import { Star } from "lucide-react";

function CartItem({
  imageurl,
  name,
  description,
  rating,
  price,
  rating2,
  HandleRemoveFromCart,
}) {
  return (
    <div className="flex max-w-[100%] rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-1/3 h-auto object-cover"
        src={imageurl}
        alt="Game Image"
      />
      <div className="flex-1 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
          {name}
        </h2>
        <p className="text-gray-600 text-base mt-2 line-clamp-3">
          {description}
        </p>
        <div className="ml-5 flex justify-between mr-7 mt-4">
          <div className="flex relative w-fit">
            <div className="flex">
              <Star className="fill-yellow-500" strokeWidth={0}></Star>
              <Star className="fill-yellow-500" strokeWidth={0}></Star>
              <Star className="fill-yellow-500" strokeWidth={0}></Star>
              <Star className="fill-yellow-500" strokeWidth={0}></Star>
              <Star className="fill-yellow-500" strokeWidth={0}></Star>
            </div>
            <div
              style={{ width: `${rating}%` }}
              className="absolute inset-0 ml-auto bg-white"
            ></div>
          </div>
          <div className="font-bold text-gray-500">{rating2}/10</div>
        </div>
        <div className="px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-800">${price}</span>
          <button
            onClick={HandleRemoveFromCart}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
