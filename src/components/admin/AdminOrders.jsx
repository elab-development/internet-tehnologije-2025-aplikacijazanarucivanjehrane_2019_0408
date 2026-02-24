import { useEffect, useState } from "react";
import { useAuth } from "../../store/AuthContext.jsx";
import Modal from "../UI/Modal.jsx";
import { currencyFormatter } from "../../util/formatting.js";

export default function AdminOrders({ open, onClose }) {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch("http://localhost:3000/admin/orders", {
                    headers: { "x-user-email": user.email },
                });

                if (!response.ok) throw new Error("Failed to fetch orders.");

                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        }

        fetchOrders();
    }, [user.email]);

    const totalRevenue = orders.reduce(
        (sum, order) => sum + parseFloat(order.totalPrice || 0), 0
    );

    return (
        <Modal open={open} onClose={onClose} className="admin-modal">
            <h2>All Orders</h2>

            {isLoading && <p>Loading orders...</p>}
            {error && <p style={{ color: "#e74c3c" }}>{error}</p>}

            {!isLoading && !error && (
                <>
                    <p style={{ color: "#ffc404", fontWeight: "bold", marginBottom: "1rem" }}>
                        Total Revenue: {currencyFormatter.format(totalRevenue)}
                    </p>

                    {orders.length === 0 ? (
                        <p>No orders yet.</p>
                    ) : (
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Email</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>#{order.id.slice(0, 6)}</td>
                                            <td>{order.customer?.name}</td>
                                            <td>{order.customer?.email}</td>
                                            <td>
                                                {order.items?.map((item) => (
                                                    <span key={item.id} style={{ display: "block", fontSize: "0.85rem" }}>
                                                        {item.name} x{item.quantity}
                                                    </span>
                                                ))}
                                            </td>
                                            <td style={{ color: "#ffc404", fontWeight: "bold" }}>
                                                {currencyFormatter.format(order.totalPrice || 0)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}

            <p className="modal-actions">
                <button className="button" onClick={onClose}>Close</button>
            </p>
        </Modal>
    );
}