<template>
  <div class="app">
    <header class="header">
      <div class="header-inner">
        <RouterLink to="/" class="brand-link">
          <img src="/images/logo.png" alt="Unnecessarily Smart Home Appliances Co." class="logo" />
          <span class="store-name">Unnecessarily Smart Home Appliances Co.</span>
        </RouterLink>
        <button class="cart-btn" @click="cartStore.toggleCart()">
          <svg class="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <span v-if="cartStore.itemCount > 0" class="cart-badge">
            {{ cartStore.itemCount }}
          </span>
        </button>
      </div>
    </header>

    <main class="main-content">
      <RouterView />
    </main>

    <CartSidebar />
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
import { useCartStore } from './stores/cart';
import CartSidebar from './components/CartSidebar.vue';

const cartStore = useCartStore();
</script>

<style scoped>
.app {
  min-height: 100vh;
  background-color: #f9f9f7;
  color: #111;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #e5e5e3;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
}

.logo {
  height: 68px;
  width: auto;
  display: block;
  flex-shrink: 0;
}

.store-name {
  font-size: 1rem;
  font-weight: 700;
  color: #111;
  line-height: 1.25;
  max-width: 240px;
  letter-spacing: -0.01em;
}

.cart-btn {
  position: relative;
  background: none;
  border: 1px solid #d1d1cf;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.cart-btn:hover {
  border-color: #111;
  background-color: #f3f3f1;
}

.cart-icon {
  width: 22px;
  height: 22px;
  display: block;
}

.cart-badge {
  position: absolute;
  top: -7px;
  right: -7px;
  background-color: #111;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}
</style>
