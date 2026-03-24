import { useState } from 'react'
import Header from './components/Header'
import FoodList from './components/FoodList'
import Cart from './components/Cart'

function App() {
  const [cart, setCart] = useState([])

  function addToCart(food) {
    setCart([...cart, food]);
  }

  return (
    <div>
      <Header cartCount={cart.length} />
      <FoodList addToCart={addToCart} />
      <Cart cart={cart} />
    </div>
  );
}

export default App;