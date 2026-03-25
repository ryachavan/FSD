import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

function FoodItem({ food }) {
  const dispatch = useDispatch();

  return (
    <div className="food-item">
      <h3>{food.name}</h3>
      <p>₹{food.price}</p>
      <button className="add-to-cart-btn" onClick={() => dispatch(addToCart(food))}>
        Add to Cart
      </button>
    </div>
  );
}

export default FoodItem;