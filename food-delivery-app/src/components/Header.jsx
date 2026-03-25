import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="header">
      <h2>🍔 Food Delivery</h2>
      <nav>
        <Link to="/">Menu</Link>
        <Link to="/cart">🛒 {cart.length} items</Link>
      </nav>
    </div>
  );
}

export default Header;