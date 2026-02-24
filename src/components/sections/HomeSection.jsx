import { useAuth } from "../../store/AuthContext.jsx";

export default function HomeSection() {
    const { user } = useAuth();

    return (
        <section style={{ textAlign: "center", padding: "4rem 2rem" }}>
            {user ? (
                <>
                    <h2 style={{ color: "#ffc404", fontSize: "2rem" }}>
                        Welcome back, {user.name}! 👋
                    </h2>
                    <p style={{ fontSize: "1.2rem", marginTop: "1rem", color: "#d9e2f1" }}>
                        Great to see you again. Head to the Menu and treat yourself to something delicious.
                    </p>
                </>
            ) : (
                <>
                    <h2 style={{ color: "#ffc404", fontSize: "2rem" }}>
                        Welcome to Food Order App 🍽️
                    </h2>
                    <p style={{ fontSize: "1.2rem", marginTop: "1rem", color: "#d9e2f1" }}>
                        Browse our menu and order your favourite meals, fresh and fast.
                    </p>
                </>
            )}
        </section>
    );
}