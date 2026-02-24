import { useEffect, useState, useContext } from "react";
import MealItem from "./MealItem.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";

export default function Meals() {
    const [loadedMeals, setLoadedMeals] = useState([]);
    const userProgressCtx = useContext(UserProgressContext);

    useEffect(() => {
        async function fetchMeals() {
            const response = await fetch("http://localhost:3000/meals", {
                method: 'GET',
            });

            if (!response.ok) {
                console.log("nije dobro");
            }
            // if it is not ok (400, 500 status)

            const meals = await response.json();
            // backend sends back data in json format (it is wrote there like that)
            // await response because it yields Promise

            setLoadedMeals(meals);
        }

        if (userProgressCtx.currentPage === "menu") {
            fetchMeals();
        }
    }, [userProgressCtx.currentPage]);


    return (
        <ul id="meals">
            {loadedMeals.map(meal => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
}