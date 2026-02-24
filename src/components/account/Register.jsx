import { useContext, useState } from "react";
import Modal from "../UI/Modal.jsx";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";

export default function Register() {
    const userProgressCtx = useContext(UserProgressContext);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function handleClose() {
        userProgressCtx.hideRegister();
        setError(null);
        setSuccess(false);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setIsLoading(true);

        const fd = new FormData(event.target);
        const { name, email, password } = Object.fromEntries(fd.entries());

        try {
            const response = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                setIsLoading(false);
                return;
            }

            setSuccess(true);
            event.target.reset();
        } catch (err) {
            setError("Could not connect to server.");
        }

        setIsLoading(false);
    }

    return (
        <Modal open={userProgressCtx.progress === "register"} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Create Account</h2>

                {success ? (
                    <>
                        <p style={{ color: "#27ae60", fontWeight: "bold" }}>
                            Account created successfully! You can now log in.
                        </p>
                        <p className="modal-actions">
                            <Button type="button" onClick={handleClose}>Close</Button>
                        </p>
                    </>
                ) : (
                    <>
                        <Input label="Full Name" type="text" id="name" />
                        <Input label="E-Mail Address" type="email" id="email" />
                        <Input label="Password (min. 6 characters)" type="password" id="password" />

                        {error && <p style={{ color: "#e74c3c", margin: "0.5rem 0" }}>{error}</p>}

                        <p className="modal-actions">
                            <Button type="button" textOnly onClick={handleClose}>Cancel</Button>
                            <Button disabled={isLoading}>
                                {isLoading ? "Registering..." : "Register"}
                            </Button>
                        </p>
                    </>
                )}
            </form>
        </Modal>
    );
}