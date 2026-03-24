function Cart({ cart }) {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
  
    return (
      <div className="cart">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p className="cart-empty">Cart is empty</p>
        ) : (
            <>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
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