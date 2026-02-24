import { useEffect, useState } from "react";
import { useAuth } from "../../store/AuthContext.jsx";
import Modal from "../UI/Modal.jsx";
import { currencyFormatter } from "../../util/formatting.js";

export default function AdminMeals({ open, onClose }) {
    const { user } = useAuth();
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingMeal, setEditingMeal] = useState(null);
    const [editError, setEditError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    async function fetchMeals() {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:3000/meals");
            const data = await response.json();
            setMeals(data);
        } catch (err) {
            setError("Could not fetch meals.");
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (open) {
            fetchMeals();
        }
    }, [open]);

    async function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this meal?")) return;

        try {
            const response = await fetch(`http://localhost:3000/admin/meals/${id}`, {
                method: "DELETE",
                headers: { "x-user-email": user.email },
            });

            if (!response.ok) throw new Error("Failed to delete meal.");
            await fetchMeals(); // Refresh list
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleEditSubmit(event) {
        event.preventDefault();
        setIsSaving(true);
        setEditError(null);

        const fd = new FormData(event.target);
        const updatedData = Object.fromEntries(fd.entries());

        try {
            const response = await fetch(`http://localhost:3000/admin/meals/${editingMeal.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-email": user.email,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) throw new Error("Failed to update meal.");

            setEditingMeal(null);
            await fetchMeals();
        } catch (err) {
            setEditError(err.message);
        }

        setIsSaving(false);
    }


    return (

        <Modal open={open} onClose={onClose} className="admin-modal">

            {/* EDIT VIEW */}
            {editingMeal ? (
                <form onSubmit={handleEditSubmit}>
                    <h2>Edit: {editingMeal.name}</h2>

                    <div className="control">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            defaultValue={editingMeal.name}
                            required
                        />
                    </div>

                    <div className="control">
                        <label htmlFor="price">Price</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            defaultValue={editingMeal.price}
                            required
                        />
                    </div>

                    <div className="control">
                        <label htmlFor="image">Image path</label>
                        <input
                            id="image"
                            name="image"
                            type="text"
                            defaultValue={editingMeal.image}
                            required
                        />
                    </div>

                    <div className="control">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={editingMeal.description}
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

                    {editError && <p style={{ color: "#e74c3c" }}>{editError}</p>}

                    <p className="modal-actions">
                        <button
                            type="button"
                            className="text-button"
                            onClick={() => setEditingMeal(null)}
                        >
                            ← Back
                        </button>
                        <button className="button" disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </p>
                </form>

            ) : (

                /* MEALS LIST VIEW */
                <>
                    <h2>Manage Meals</h2>

                    {isLoading && <p>Loading meals...</p>}
                    {error && <p style={{ color: "#e74c3c" }}>{error}</p>}

                    {!isLoading && !error && (
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {meals.map((meal) => (
                                        <tr key={meal.id}>
                                            <td>{meal.name}</td>
                                            <td>{currencyFormatter.format(meal.price)}</td>
                                            <td>
                                                <button
                                                    className="button"
                                                    style={{ marginRight: "0.5rem", padding: "0.25rem 0.75rem" }}
                                                    onClick={() => setEditingMeal(meal)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="button"
                                                    style={{ backgroundColor: "#e74c3c", borderColor: "#e74c3c", padding: "0.25rem 0.75rem" }}
                                                    onClick={() => handleDelete(meal.id)}
                                                >
                                                    Delete
                                                </button>
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
                </>
            )}

        </Modal>
    );
}