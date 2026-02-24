import { useContext, useState } from "react";
import Modal from "../UI/Modal.jsx";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";
import { useAuth } from "../../store/AuthContext.jsx";

export default function Login() {
    const userProgressCtx = useContext(UserProgressContext);
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function handleClose() {
        userProgressCtx.hideLogin();
        setError(null);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setIsLoading(true);

        const fd = new FormData(event.target);
        const { email, password } = Object.fromEntries(fd.entries());

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                setIsLoading(false);
                return;
            }

            login(data.user);
            event.target.reset();
            handleClose();
        } catch (err) {
            setError("Could not connect to server.");
        }

        setIsLoading(false);
    }

    return (
        <Modal open={userProgressCtx.progress === "login"} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>

                <Input label="E-Mail Address" type="email" id="email" />
                <Input label="Password" type="password" id="password" />

                {error && <p style={{ color: "#e74c3c", margin: "0.5rem 0" }}>{error}</p>}

                <p className="modal-actions">
                    <Button type="button" textOnly onClick={handleClose}>Cancel</Button>
                    <Button disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </p>
            </form>
        </Modal>
    );
}