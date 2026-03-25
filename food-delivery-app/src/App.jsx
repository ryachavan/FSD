import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FoodList from "./components/FoodList";
import Cart from "./components/Cart";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<FoodList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;