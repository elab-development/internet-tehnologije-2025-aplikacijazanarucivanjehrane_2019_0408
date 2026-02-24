import logoImg from "../../assets/logo.jpg";
import Button from "../UI/Button.jsx";

export default function Header() {

    return (
        <header id="main-header">
            <div className="header-top">
                <div id="title">
                    <img src={logoImg} alt="A restaurant" />
                    <h1>Food order app</h1>
                </div>

                <div className="cart-button">
                    <Button textOnly >
                        🛒 Cart (0)
                    </Button>
                </div>
            </div>

            <div className="header-bottom">
                <nav className="nav-links">
                    <Button textOnly >Home</Button>
                    <Button textOnly >Menu</Button>
                    <Button textOnly >About</Button>
                    <Button textOnly >Contact</Button>
                </nav>

                <div className="auth-buttons">
                    <Button textOnly >Login</Button>
                    <Button textOnly >Register</Button>

                    <Button textOnly >Logout</Button>

                </div>
            </div>
        </header>
    );
}