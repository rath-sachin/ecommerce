import React, { useState } from "react";
import InputField from "../components/input"; // Adjust path as needed
import Button from "../components/button"; // Adjust path as needed
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth.provider";
import Select from "react-select";
import { useCategory as useCategory } from "../providers/category.provider";

const AddGame = () => {
  // const [image, setImage] = useState("");
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [rating, setRating] = useState("");
  // const [price, setPrice] = useState("");
  // const [, setPrice] = useState("");
  const { category } = useCategory();

  const navigate = useNavigate();
  const categories = category.map((c) => {
    return {
      value: c.id,
      label: c.name,
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      image: formData.get("image"),
      name: formData.get("name"),
      description: formData.get("description"),
      rating: formData.get("rating"),
      price: formData.get("price"),
      categories: formData.getAll("categories"),
    };

    try {
      const response = await fetch("http://localhost:5173/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        console.log("success");
      }
    } catch (e) {
      console.log("something went wrong!");
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">
          Add Game
        </h2>
        <form
          id="addgameform"
          onSubmit={handleSubmit}
          className="space-y-6 flex flex-col"
        >
          <InputField
            label="Image"
            type="text"
            id="image"
            placeholder={"Image Link"}
            name={"image"}
            // value={image}
            // onChange={(e) => setImage(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <InputField
            label="Name"
            type="text"
            id="name"
            placeholder={"Name"}
            name={"name"}
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <InputField
            label="Description"
            type="text"
            id="description"
            placeholder={"Description"}
            name={"description"}
            // value={description}
            // onChange={(e) => setDescription(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <InputField
            label="Rating"
            type="number"
            id="rating"
            placeholder={"Rating"}
            name={"rating"}
            // value={rating}
            // onChange={(e) => setRating(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <InputField
            label="Price"
            type="number"
            id="price"
            placeholder={"Price"}
            name={"price"}
            // value={price}
            // onChange={(e) => setPrice(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={categories}
            menuPlacement="auto"
            name="categories"
          />

          <Button
            label="Add Game"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </form>
      </div>
    </div>
  );
};

export default AddGame;
