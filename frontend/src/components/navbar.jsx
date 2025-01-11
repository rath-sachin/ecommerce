import React from "react";
import { useAuth } from "../providers/auth.provider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const myauth = useAuth();
  const navigate = useNavigate();
  async function HandleSubmit() {
    if (myauth.state == "authenticated") {
      try {
        const response = await fetch("http://localhost:5173/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          myauth.logout();
        }
      } catch (e) {
        console.log("somethine went");
        console.log(e);
      }
    }
    if (myauth.state == "unauthenticated") {
      navigate("/signin");
    }
  }
  const HandleAdmin = async (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };
  const HandleHome = async (e) => {
    e.preventDefault();
    navigate("/");
  };
  const HandleCart = async (e) => {
    e.preventDefault();
    navigate("/cart");
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold select-none">
          GamerZ Arena
        </div>
        <div className="space-x-4">
          <button
            onClick={HandleHome}
            className={
              "text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 " +
              (myauth.state != "authenticated" ? "hidden" : "")
            }
          >
            Home
          </button>
          <button
            onClick={HandleAdmin}
            className={
              "text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 " +
              (myauth.user?.role != "admin" ? "hidden" : "")
            }
          >
            Admin
          </button>
          <button
            onClick={HandleSubmit}
            className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {myauth.state == "authenticated" ? "Logout" : "login"}
          </button>
          <button
            onClick={HandleCart}
            className={
              "text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 " +
              (myauth.state != "authenticated" ? "hidden" : "")
            }
          >
            Cart
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
