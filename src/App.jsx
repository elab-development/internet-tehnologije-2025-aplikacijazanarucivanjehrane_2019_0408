import Header from "./components/header/Header.jsx";
import HomeSection from "./components/sections/HomeSection.jsx";
import Meals from "./components/sections/Meals.jsx";
import AboutSection from "./components/sections/AboutSection.jsx";
import ContactSection from "./components//sections/ContactSection.jsx";
import Cart from "./components/cart/Cart.jsx";
import Checkout from "./components/cart/Checkout.jsx";
import Login from "./components/account/Login.jsx";
import Register from "./components/account/Register.jsx";
import AdminSidebar from "./components/admin/AdminSidebar.jsx";

import { CartContextProvider } from "./store/CartContext.jsx";
import UserProgressContext, { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
import { useContext } from "react";
import { AuthContextProvider } from "./store/AuthContext.jsx";
import AuthContext from "./store/AuthContext.jsx";

function AdminPanel() {
  const { user } = useContext(AuthContext);
  return user?.type === "admin" ? <AdminSidebar /> : null;
}

function Content() {
  const userProgressCtx = useContext(UserProgressContext);

  return (
    <>
      {userProgressCtx.currentPage === "home" && <HomeSection />}
      {userProgressCtx.currentPage === "menu" && <Meals />}
      {userProgressCtx.currentPage === "about" && <AboutSection />}
      {userProgressCtx.currentPage === "contact" && <ContactSection />}
    </>
  );
}

export default function App() {

  return (
    <AuthContextProvider>
      <UserProgressContextProvider>
        <CartContextProvider>
          <div className="app-layout">
            <AdminPanel />
            <div className="main-content">
              <Header />
              <Content />
            </div>
          </div>
          <Cart />
          <Checkout />
          <Login />
          <Register />
        </CartContextProvider>
      </UserProgressContextProvider>
    </AuthContextProvider>
  );
}
