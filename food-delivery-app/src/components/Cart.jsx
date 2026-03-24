function Cart({ cart }) {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
  
    return (
      <div style={{ background: "#f4f4f4", padding: "15px", marginTop: "20px" }}>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cart.map((item, index) => (
            <p key={index}>{item.name} — ₹{item.price}</p>
          ))
        )}
        <h3>Total: ₹{total}</h3>
      </div>
    );
  }
  
  export default Cart;