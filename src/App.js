import "./App.css";
import Navigation from "./ components/Navigation";
import Home from "./pages/Home";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import Signup from "./pages/Signup";
import Footer from "./ components/Footer";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import NewProductPage from "./pages/NewProductPage";
import ScrollToTop from "./ components/ScrollToTop";
import CategoryPage from "./pages/CategoryPage";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import EditProductPage from "./pages/EditProductPage";
function App() {
    const user = useSelector((state) => state.user);

    return (
        <div className="App">
            <BrowserRouter>
                <ScrollToTop />
                <Navigation />
                <Routes>
                    <Route index element={<Home />} />
                    {user && <Route path="/cart" element={<CartPage />} />}
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/product/:id/edit" element={<EditProductPage />} />
                    <Route path="/new-product" element={<NewProductPage />} />
                    <Route path="/category/:category" element={<CategoryPage />} />
                    <Route path="/orders" element={<Orders />} />

                    {user && user.isAdmin && <Route path="/dashboard/*" element={<Dashboard />} />}
                    {!user && (
                        <>
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />
                        </>
                    )}
                    <Route path="*" element={<Home />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
