import { useEffect, useState } from "react";
import { useAuth } from "../../store/AuthContext.jsx";
import Modal from "../UI/Modal.jsx";

export default function AdminUsers({ open, onClose }) {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     async function fetchUsers() {
    //         try {
    //             const response = await fetch("http://localhost:3000/admin/users", {
    //                 headers: { "x-user-email": user.email },
    //             });

    //             if (!response.ok) throw new Error("Failed to fetch users.");

    //             const data = await response.json();
    //             setUsers(data);
    //         } catch (err) {
    //             setError(err.message);
    //         }
    //         setIsLoading(false);
    //     }

    //     fetchUsers();
    // }, [user.email]);

    async function fetchUsers() {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:3000/admin/users", {
                headers: { "x-user-email": user.email },
            });

            if (!response.ok) throw new Error("Failed to fetch users.");

            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (open) fetchUsers();
    }, [open]);

    async function handleToggleLoyalty(userId, currentType) {
        const newType = currentType === "loyalty" ? "regular" : "loyalty";

        try {
            const response = await fetch(`http://localhost:3000/admin/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-email": user.email,
                },
                body: JSON.stringify({ type: newType }),
            });

            if (!response.ok) throw new Error("Failed to update user type.");

            // Refresh the users list after successful update
            await fetchUsers();
        } catch (err) {
            setError(err.message);
        }
    }

    function badgeStyle(type) {
        if (type === "admin") return { color: "#e74c3c", fontWeight: "bold" };
        if (type === "loyalty") return { color: "#27ae60", fontWeight: "bold" };
        return { color: "#538df2", fontWeight: "bold" };
    }

    return (
        <Modal open={open} onClose={onClose} className="admin-modal">
            <h2>All Users</h2>

            {isLoading && <p>Loading users...</p>}
            {error && <p style={{ color: "#e74c3c" }}>{error}</p>}

            {!isLoading && !error && (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Loyalty Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td style={badgeStyle(u.type)}>
                                        {u.type.toUpperCase()}
                                    </td>
                                    <td>
                                        {/* Shows checkbox for regular/loyalty users, text for admins */}
                                        {u.type !== "admin" ? (
                                            <label className="loyalty-checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={u.type === "loyalty"}
                                                    onChange={() => handleToggleLoyalty(u.id, u.type)}
                                                />
                                                <span>Loyalty Member</span>
                                            </label>
                                        ) : (
                                            <span style={{ color: "#888", fontSize: "0.85rem" }}>
                                                Admin (cannot change)
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <p className="modal-actions">
                <button className="button" onClick={onClose}>Close</button>
            </p>
        </Modal>
    );
}