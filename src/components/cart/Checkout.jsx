import { useContext } from "react";

import Modal from "../UI/Modal.jsx";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import CartContext from "../../store/CartContext.jsx";
import { currencyFormatter } from "../../util/formatting.js";
import UserProgressContext from "../../store/UserProgressContext.jsx";
import { useAuth } from "../../store/AuthContext.jsx";

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const { user } = useAuth();

    const totalAmount = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price
    }, 0);

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const deliveryData = Object.fromEntries(fd.entries());

        // Build customer object based on login status
        const customerData = user
            ? {
                name: user.name,
                email: user.email,
                ...deliveryData, // street, postal-code, city
            } : deliveryData; // all fields including name and email

        try {
            const response = await fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    order: {
                        items: cartCtx.items,
                        customer: customerData,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error("Order submission failed");
            }

            cartCtx.clearCart();
            userProgressCtx.hideCheckout();
            
        } catch (error) {
            console.error("Could not submit order:", error);
        }

    }

    return (
        <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total amount: {currencyFormatter.format(totalAmount)}</p>

                {user ? (
                    <>
                        {/* Logged-in user: show name/email as read-only info */}
                        <div style={{
                            backgroundColor: "#312c1d",
                            padding: "1rem",
                            borderRadius: "4px",
                            marginBottom: "1rem"
                        }}>
                            <p style={{ margin: "0.25rem 0", color: "#ffc404" }}>
                                <strong>Name:</strong> {user.name}
                            </p>
                            <p style={{ margin: "0.25rem 0", color: "#ffc404" }}>
                                <strong>Email:</strong> {user.email}
                            </p>
                        </div>

                        {/* Only delivery address fields */}
                        <Input label="Street" type="text" id="street" />
                        <div className="control-row">
                            <Input label="Postal Code" type="text" id="postal-code" />
                            <Input label="City" type="text" id="city" />
                        </div>
                    </>
                ) : (
                    <>
                        {/* Guest checkout: all fields */}
                        <Input label="Full Name" type="text" id="name" />
                        <Input label="E-Mail Address" type="email" id="email" />
                        <Input label="Street" type="text" id="street" />
                        <div className="control-row">
                            <Input label="Postal Code" type="text" id="postal-code" />
                            <Input label="City" type="text" id="city" />
                        </div>
                    </>
                )}

                <p className="modal-actions">
                    <Button type="button" textOnly onClick={handleClose}>
                        Close
                    </Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    );

}