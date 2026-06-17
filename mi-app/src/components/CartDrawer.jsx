// src/components/CartDrawer.jsx
// Reemplaza al panel de carrito que llenaba updateCart() con innerHTML.
// Misma IDs/clases que tu CSS original (cartDrawer, cartOverlay, cart-item, etc.)
// así no necesitas tocar estilo_pag_rop.css para esta parte.

import { formatPrice } from '../data/products';

export default function CartDrawer({ cart, isOpen, total, onClose, onChangeQty, onRemove }) {
  return (
    <>
      <div className={`cart-overlay${isOpen ? ' open' : ''}`} onClick={onClose} />
      <div className={`cart-drawer${isOpen ? ' open' : ''}`} id="cartDrawer">
        <div id="cartItemsEl">
          {!cart.length ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <p>
                Tu carrito está vacío.
                <br />
                Agrega productos para comenzar.
              </p>
            </div>
          ) : (
            cart.map((x) => (
              <div className="cart-item" key={x.id}>
                <img className="cart-item-img" src={x.img} alt={x.name} />
                <div className="cart-item-info">
                  <div className="cart-item-name">{x.name}</div>
                  <div className="cart-item-price">{formatPrice(x.price)}</div>
                  <div className="cart-item-qty">
                    <button className="qty-btn" onClick={() => onChangeQty(x.id, -1)}>
                      −
                    </button>
                    <span style={{ fontSize: '.85em' }}>{x.qty}</span>
                    <button className="qty-btn" onClick={() => onChangeQty(x.id, 1)}>
                      +
                    </button>
                  </div>
                  <button className="cart-item-remove" onClick={() => onRemove(x.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div id="cartTotalEl">{formatPrice(total)}</div>
      </div>
    </>
  );
}
