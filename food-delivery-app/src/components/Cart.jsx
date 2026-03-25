import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">Cart is empty — add something!</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
              <button className="remove-btn" onClick={() => dispatch(removeFromCart(index))}>
                Remove
              </button>
            </div>
          ))}
          <div className="cart-total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;