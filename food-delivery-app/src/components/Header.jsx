function Header({ cartCount}) {
    return (
        <div style={{ background: "#ff4d4d", color: "white", padding: "15px" }}>
            <h2>Food Delivery</h2>
            <p>Cart Items: {cartCount}</p>
        </div>
    );
}

export default Header;