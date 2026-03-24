function FoodItem({ food, addToCart }) {
    return (
      <div className="food-item">
        <h3>{food.name}</h3>
        <p>Price: ₹{food.price}</p>
        <button className="add-to-cart-btn" onClick={() => addToCart(food)}>Add to Cart</button>
      </div>
    );
  }
  
  export default FoodItem;