// src/components/ProductGrid.jsx
// Reemplaza a renderProducts() de main.js.
// No maneja carrito ni favoritos por dentro: recibe todo por props,
// así luego se lo conectamos al estado real cuando hagamos el carrito.

import { formatPrice } from '../data/products';

export default function ProductGrid({ products, favs = new Set(), onToggleFav, onAddToCart }) {
  if (!products.length) {
    return (
      <p style={{ color: 'var(--gray)', gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>
        No hay productos en esta categoría.
      </p>
    );
  }

  return (
    <div id="prodGrid">
      {products.map((p) => (
        <div className="prod-card" key={p.id}>
          <div className="prod-img-wrap">
            <img className="prod-img" src={p.img} alt={p.name} loading="lazy" />
            {p.badge && <span className={`prod-badge${p.isNew ? ' new' : ''}`}>{p.badge}</span>}
            {p.isNew && !p.badge && <span className="prod-badge new">Nuevo</span>}
            <button
              className={`prod-fav${favs.has(p.id) ? ' active' : ''}`}
              onClick={() => onToggleFav?.(p.id)}
            >
              ♥
            </button>
          </div>
          <div className="prod-info">
            <div className="prod-cat">{p.cat}</div>
            <div className="prod-name">{p.name}</div>
            <div className="prod-bottom">
              <span className="prod-price">{formatPrice(p.price)}</span>
              <button className="btn-add" onClick={() => onAddToCart?.(p.id)}>
                + Agregar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
