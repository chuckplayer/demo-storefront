<template>
  <Transition name="slide">
    <div v-if="cartStore.isOpen" class="sidebar-overlay" @click.self="cartStore.toggleCart()">
      <div class="sidebar">
        <div class="sidebar-header">
          <h2 class="sidebar-title">Cart</h2>
          <button class="close-btn" @click="cartStore.toggleCart()" aria-label="Close cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div class="sidebar-body">
          <div v-if="cartStore.items.length === 0" class="empty-cart">
            <p class="empty-title">Your cart is empty</p>
            <p class="empty-sub">Add some unnecessarily smart appliances.</p>
          </div>

          <ul v-else class="cart-items">
            <li
              v-for="item in cartStore.items"
              :key="item.product.id"
              class="cart-item"
            >
              <div class="item-image-wrap">
                <img :src="item.product.image_url" :alt="item.product.name" class="item-image" />
              </div>
              <div class="item-details">
                <span class="item-name">{{ item.product.name }}</span>
                <span class="item-unit-price">{{ formatPrice(item.product.price) }}</span>
                <div class="item-controls">
                  <button
                    class="qty-btn"
                    @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                  >−</button>
                  <span class="qty-value">{{ item.quantity }}</span>
                  <button
                    class="qty-btn"
                    @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                  >+</button>
                  <button
                    class="remove-btn"
                    @click="cartStore.removeItem(item.product.id)"
                    aria-label="Remove item"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14H6L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4h6v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="sidebar-footer">
          <div class="total-row">
            <span class="total-label">Total</span>
            <!-- Total is intentionally $0 — see cart store TODO -->
            <span class="total-amount">{{ formatPrice(cartStore.total) }}</span>
          </div>
          <!-- TODO: Implement checkout flow -->
          <button class="checkout-btn" :disabled="cartStore.items.length === 0">
            Checkout
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart';

const cartStore = useCartStore();

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}
</script>

<style scoped>
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 200;
  display: flex;
  justify-content: flex-end;
}

.sidebar {
  background-color: #fff;
  width: 400px;
  max-width: 90vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 20px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e5e3;
}

.sidebar-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #111;
  letter-spacing: -0.01em;
}

.close-btn {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: color 0.15s ease;
}

.close-btn svg {
  width: 18px;
  height: 18px;
}

.close-btn:hover {
  color: #111;
}

.sidebar-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 1.5rem;
}

.empty-cart {
  text-align: center;
  padding: 3rem 0;
}

.empty-title {
  margin: 0 0 0.4rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: #111;
}

.empty-sub {
  margin: 0;
  font-size: 0.85rem;
  color: #999;
}

.cart-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.cart-item {
  display: flex;
  gap: 0.875rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0ee;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image-wrap {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 6px;
  overflow: hidden;
  background-color: #f3f3f1;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.item-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #111;
  line-height: 1.3;
}

.item-unit-price {
  font-size: 0.8rem;
  color: #666;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.25rem;
}

.qty-btn {
  background-color: #f3f3f1;
  border: none;
  color: #111;
  border-radius: 4px;
  width: 26px;
  height: 26px;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  transition: background-color 0.15s ease;
}

.qty-btn:hover {
  background-color: #e5e5e3;
}

.qty-value {
  min-width: 20px;
  text-align: center;
  font-weight: 600;
  font-size: 0.85rem;
  color: #111;
}

.remove-btn {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: #bbb;
  display: flex;
  align-items: center;
  padding: 0.2rem;
  border-radius: 4px;
  transition: color 0.15s ease;
}

.remove-btn svg {
  width: 15px;
  height: 15px;
}

.remove-btn:hover {
  color: #666;
}

.sidebar-footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #e5e5e3;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-size: 0.9rem;
  color: #666;
}

.total-amount {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111;
}

.checkout-btn {
  background-color: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.8rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.01em;
  transition: background-color 0.15s ease;
}

.checkout-btn:hover:not(:disabled) {
  background-color: #333;
}

.checkout-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s ease;
}

.slide-enter-active .sidebar,
.slide-leave-active .sidebar {
  transition: transform 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-from .sidebar,
.slide-leave-to .sidebar {
  transform: translateX(100%);
}
</style>
