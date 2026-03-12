let products = [
    { name: "Laptop", price: 50000 },
    { name: "Mobile", price: 20000 },
    { name: "Headphones", price: 3000 },
    { name: "Keyboard", price: 1500 }
  ];
  
  console.log("All Products:");
  products.forEach(function(product) {
    console.log("Name:", product.name, "Price:", product.price);
  });
  
  function filterByPrice(minPrice) {
    let filteredProducts = products.filter(function(product) {
      return product.price >= minPrice;
    });
  
    console.log("Filtered Products (Price >= " + minPrice + "):");
    filteredProducts.forEach(function(product) {
      console.log("Name:", product.name, "Price:", product.price);
    });
  }
  
  let userPrice = prompt("Enter minimum price:");
  filterByPrice(Number(userPrice));