import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./providers/auth.provider";
import Dashboard from "./pages/dashboard";
import WithAuth from "./components/withauth";
import Home from "./pages/home";
import { GameProvider } from "./providers/game.provider";
import AddGame from "./pages/addgame";
import { CategoryProvider as CategoryProvider } from "./providers/category.provider";
import CartProvider from "./providers/cart.provider";
import Cart from "./pages/cart";
import CartItem from "./components/cartitem";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <GameProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              <Navbar />

              <div className="">
                <Routes>
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />

                  <Route
                    path="/dashboard"
                    element={
                      <WithAuth>
                        <Dashboard />
                      </WithAuth>
                    }
                  />
                </Routes>
              </div>
            </Router>
          </CartProvider>
        </AuthProvider>
      </GameProvider>
      <ToastContainer />
    </>
  );
}

export default App;
