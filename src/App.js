import "./App.css";
import Navigation from "./ components/Navigation";
import Home from "./pages/Home";
import { Route, Router, BrowserRouter, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import Signup from "./pages/Signup";
import Footer from "./ components/Footer";
import Login from "./pages/Login";
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
