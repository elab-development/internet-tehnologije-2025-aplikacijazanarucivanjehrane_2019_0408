import { useContext } from "react";
import { currencyFormatter } from "../../util/formatting.js";
import Button from "../UI/Button.jsx";
import CartContext from "../../store/CartContext.jsx";
import { useAuth } from "../../store/AuthContext.jsx";

export default function MealItem({ meal }) {
    const cartCtx = useContext(CartContext);
    const { user } = useAuth();

    const isLoyaltyUser = user?.type === "loyalty";
    const regularPrice = parseFloat(meal.price);
    const loyaltyPrice = isLoyaltyUser ? regularPrice * 0.8 : regularPrice;

    function handleAddMealToCart() {
        const itemToAdd = isLoyaltyUser
            ? { ...meal, price: loyaltyPrice.toFixed(2) }
            : meal;

        cartCtx.addItem(itemToAdd);
    }

    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    {isLoyaltyUser ? (
                        <p className="meal-item-price">
                            <span style={{
                                textDecoration: "line-through",
                                color: "#888",
                                marginRight: "0.5rem"
                            }}>
                                {currencyFormatter.format(regularPrice)}
                            </span>
                            <span style={{ color: "#e74c3c", fontWeight: "bold" }}>
                                {currencyFormatter.format(loyaltyPrice)}
                            </span>
                        </p>
                    ) : (
                        <p className="meal-item-price">
                            {currencyFormatter.format(regularPrice)}
                        </p>
                    )}
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>
                        Add to cart
                    </Button>
                </p>
            </article>
        </li>
    );
}