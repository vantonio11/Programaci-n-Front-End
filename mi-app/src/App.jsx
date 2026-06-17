import { products } from './data/products';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import { useCart } from './hooks/useCart';

function App() {
  const { cart, isOpen, count, total, addToCart, removeFromCart, changeQty, toggleCart } = useCart();

  return (
    <>
      <button onClick={toggleCart}>🛒 {count}</button>
      <ProductGrid products={products} onAddToCart={addToCart} />
      <CartDrawer
        cart={cart}
        isOpen={isOpen}
        total={total}
        onClose={toggleCart}
        onChangeQty={changeQty}
        onRemove={removeFromCart}
      />
    </>
  );
}

export default App;