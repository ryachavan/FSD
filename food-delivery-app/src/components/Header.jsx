function Header({ cartCount}) {
    return (
        <div style={{ background: "#ff4d4d", color: "white", padding: "15px" }}>
            <h2>Food Delivery App</h2><br/>
            <span className="header-cart-badge">🛒 {cartCount} items</span>
        </div>
    );
}

export default Header;