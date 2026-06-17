// src/hooks/useCart.js
// Reemplaza a las variables sueltas `cart` + updateCart/addToCart/changeQty/removeFromCart de main.js.
// Todo vive en estado de React en vez de variables globales.

import { useState } from 'react';
import { products as catalog } from '../data/products';

export function useCart() {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (id) => {
    setCart((prev) => {
      const existente = prev.find((x) => x.id === id);
      if (existente) {
        return prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x));
      }
      const producto = catalog.find((x) => x.id === id);
      return [...prev, { ...producto, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((x) => x.id !== id));
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, qty: x.qty + delta } : x))
        .filter((x) => x.qty > 0)
    );
  };

  const toggleCart = () => setIsOpen((v) => !v);

  const count = cart.reduce((s, x) => s + x.qty, 0);
  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);

  return { cart, isOpen, count, total, addToCart, removeFromCart, changeQty, toggleCart };
}