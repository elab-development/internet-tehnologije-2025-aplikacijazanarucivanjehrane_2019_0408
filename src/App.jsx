import Header from "./components/header/Header.jsx";

import { CartContextProvider } from "./store/CartContext.jsx";
import UserProgressContext, { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
import { useContext } from "react";
import { AuthContextProvider } from "./store/AuthContext.jsx";
import AuthContext from "./store/AuthContext.jsx";

export default function App() {
  return (
    <AuthContextProvider>
      <UserProgressContextProvider>
        <CartContextProvider>
          <div className="app-layout">
            <div className="main-content">
              <Header />
            </div>
          </div>
        </CartContextProvider>
      </UserProgressContextProvider>
    </AuthContextProvider>
  );
}
