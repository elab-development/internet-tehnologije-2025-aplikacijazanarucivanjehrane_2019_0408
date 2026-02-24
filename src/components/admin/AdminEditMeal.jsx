import { useState } from "react";
import { useAuth } from "../../store/AuthContext.jsx";
import Modal from "../UI/Modal.jsx";
import Input from "../UI/Input.jsx";

export default function AdminEditMeal({ open, meal, onClose }) {
    const { user } = useAuth();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        const fd = new FormData(event.target);
        const updatedData = Object.fromEntries(fd.entries());

        try {
            const response = await fetch(`http://localhost:3000/admin/meals/${meal.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-email": user.email,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) throw new Error("Failed to update meal.");
            onClose();
        } catch (err) {
            setError(err.message);
        }

        setIsLoading(false);
    }

    if (!meal) {
        return null;
    }

    return (
        <Modal open={open} onClose={onClose} className="admin-modal">
            <form onSubmit={handleSubmit}>
                <h2>Edit Meal</h2>

                <Input label="Name" type="text" id="name" defaultValue={meal.name} />
                <Input label="Price" type="number" id="price" step="0.01" defaultValue={meal.price} />
                <Input label="Image path (e.g. images/meal.jpg)" type="text" id="image" defaultValue={meal.image} />

                <div className="control">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={meal.description}
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
                        {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                </p>
            </form>
        </Modal>
    );
}