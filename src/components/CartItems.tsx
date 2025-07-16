import { type CartItem, addToCart, removeFromCart } from "../store/cart-slice";
import { useCartDispatch, useCartSelector } from "../store/hooks";

export default function CartItems() {
  const cartItems = useCartSelector((state) => state.cart.items);
  const dispatch = useCartDispatch();

  const formattedTotalPrice = `$${cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ).toFixed(2)}`; 

  function handleAddToCart(item: CartItem) {
  dispatch(addToCart({ id: item.id, title: item.title, price: item.price }));
  }

  function handleRemoveFromCart(id: string) {
    dispatch(removeFromCart({ id }));
  }
  
  return (
    <div id="cart">
    {cartItems.length === 0 ? <p>No items in cart!</p> : null}
{cartItems.length > 0 && (
  <>
    <h2>Cart Items</h2>
    <ul id="cart-items">
      {cartItems.map((item) => {
        const formattedPrice = `$${item.price.toFixed(2)}`;

        return (
          <li key={item.id}>
            <div>
              <span>{item.title}</span>
              <span> ({formattedPrice})</span>
            </div>
            <div className="cart-item-actions">
              <button onClick={() => handleRemoveFromCart(item.id)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleAddToCart(item)}>+</button>
            </div>
          </li>
        );
      })}
    </ul>
    <p id="cart-total-price">
      Cart Total: <strong>{formattedTotalPrice}</strong>
    </p>
  </>
)}
    </div>
  );
}
