import FoodItem from "./FoodItem";

function FoodList() {
  const foods = [
    { id: 1, name: "Burger", price: 120 },
    { id: 2, name: "Pizza", price: 250 },
    { id: 3, name: "Pasta", price: 180 },
    { id: 4, name: "Fries", price: 80 },
  ];

  return (
    <div className="food-list">
      <h2>Menu</h2>
      <div className="food-grid">
        {foods.map((food) => (
          <FoodItem key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
}

export default FoodList;