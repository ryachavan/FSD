function FoodItem({ food, addToCart }) {
    return (
      <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
        <h3>{food.name}</h3>
        <p>Price: ₹{food.price}</p>
        <button onClick={() => addToCart(food)}>Add to Cart</button>
      </div>
    );
  }
  
  export default FoodItem;