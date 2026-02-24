import { useState } from "react";
import AdminOrders from "./AdminOrders.jsx";
import AdminUsers from "./AdminUsers.jsx";
import AdminMeals from "./AdminMeals.jsx";
import AdminAddMeal from "./AdminAddMeal.jsx";

export default function AdminSidebar() {
    const [activeModal, setActiveModal] = useState(null);

    function closeModal() {
        setActiveModal(null);
    }

    return (
        <>
            <aside className="admin-sidebar">
                <p className="admin-sidebar-title">Admin</p>

                <button
                    className="admin-sidebar-btn"
                    onClick={() => setActiveModal("orders")}
                    title="View Orders"
                >
                    📋
                    <span>Orders</span>
                </button>

                <button
                    className="admin-sidebar-btn"
                    onClick={() => setActiveModal("users")}
                    title="View Users"
                >
                    👥
                    <span>Users</span>
                </button>

                <button
                    className="admin-sidebar-btn"
                    onClick={() => setActiveModal("meals")}
                    title="Manage Meals"
                >
                    🍽️
                    <span>Meals</span>
                </button>

                <button
                    className="admin-sidebar-btn"
                    onClick={() => setActiveModal("addMeal")}
                    title="Add New Meal" // maybe delete
                >
                    ➕
                    <span>Add Meal</span>
                </button>
            </aside>

            <AdminOrders open={activeModal === "orders"} onClose={closeModal} />
            <AdminUsers open={activeModal === "users"} onClose={closeModal} />
            <AdminMeals open={activeModal === "meals"} onClose={closeModal} />
            <AdminAddMeal open={activeModal === "addMeal"} onClose={closeModal} />
            
        </>
    );
}