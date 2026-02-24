import { useContext } from "react";
import { useAuth } from "../../store/AuthContext.jsx";

import logoImg from "../../assets/logo.jpg";
import Button from "../UI/Button.jsx";

import CartContext from "../../store/CartContext.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";

export default function Header() {

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const { user, logout } = useAuth();

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => totalNumberOfItems + item.quantity, 0);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    function handleChangePage(page) {
        userProgressCtx.setCurrentPage(page);
    }

    function handleLogout() {
        cartCtx.clearCart();
        logout();
    }

    return (
        <header id="main-header">
            <div className="header-top">
                <div id="title">
                    <img src={logoImg} alt="A restaurant" />
                    <h1>Food order app</h1>
                </div>

                <div className="cart-button">
                    <Button textOnly onClick={handleShowCart}>
                        🛒 Cart ({totalCartItems})
                    </Button>
                </div>
            </div>

            <div className="header-bottom">
                <nav className="nav-links">
                    <Button textOnly onClick={() => handleChangePage("home")}>Home</Button>
                    <Button textOnly onClick={() => handleChangePage("menu")}>Menu</Button>
                    <Button textOnly onClick={() => handleChangePage("about")}>About</Button>
                    <Button textOnly onClick={() => handleChangePage("contact")}>Contact</Button>
                </nav>

                <div className="auth-buttons">
                    {!user ? (
                        <>
                            <Button textOnly onClick={() => userProgressCtx.showLogin()}>Login</Button>
                            <Button textOnly onClick={() => userProgressCtx.showRegister()}>Register</Button>
                        </>
                    ) : (
                        <>
                            {user.type === "admin" && (
                                <span className="user-badge admin-badge">[ADMIN]</span>
                            )}
                            {user.type === "loyalty" && (
                                <span className="user-badge loyalty-badge">[LOYALTY ⭐]</span>
                            )}
                            <Button textOnly onClick={handleLogout}>Logout</Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}