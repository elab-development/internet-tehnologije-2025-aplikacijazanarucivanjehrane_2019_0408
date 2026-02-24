import { useState } from "react";
import { useAuth } from "../../store/AuthContext.jsx";
import Modal from "../UI/Modal.jsx";
import Input from "../UI/Input.jsx";

export default function AdminAddMeal({ open, onClose }) {
    const { user } = useAuth();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const fd = new FormData(event.target);
        const mealData = Object.fromEntries(fd.entries());

        try {
            const response = await fetch("http://localhost:3000/admin/meals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-email": user.email,
                },
                body: JSON.stringify(mealData),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setSuccess(true);
            event.target.reset();
        } catch (err) {
            setError(err.message);
        }

        setIsLoading(false);
    }

    return (
        <Modal open={open} onClose={onClose} className="admin-modal">
            <form onSubmit={handleSubmit}>
                <h2>Add New Meal</h2>

                {success && (
                    <p style={{ color: "#27ae60", fontWeight: "bold" }}>
                        Meal added successfully!
                    </p>
                )}

                <Input label="Name" type="text" id="name" />
                <Input label="Price (e.g. 9.99)" type="number" id="price" step="0.01" />
                <Input label="Image path (e.g. images/meal.jpg)" type="text" id="image" />

                <div className="control">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        rows={3}
                        style={{
                            width: "100%",
                            font: "inherit",
                            padding: "0.5rem",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            resize: "vertical"
                        }}
                    />
                </div>

                {error && <p style={{ color: "#e74c3c" }}>{error}</p>}

                <p className="modal-actions">
                    <button type="button" className="text-button" onClick={onClose}>Cancel</button>
                    <button className="button" disabled={isLoading}>
                        {isLoading ? "Adding..." : "Add Meal"}
                    </button>
                </p>
            </form>
        </Modal>
    );
}