<template>
  <div class="product-detail-view">
    <RouterLink to="/" class="back-link">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
      All Products
    </RouterLink>

    <div v-if="loading" class="state-message">
      <p>Loading product...</p>
    </div>

    <div v-else-if="error" class="state-message error">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="product" class="product-detail">
      <div class="product-image-wrap" @click="openZoom">
        <img
          :src="product.image_url"
          :alt="product.name"
          class="product-image"
          @error="onImageError"
        />
        <button class="zoom-btn" @click.stop="openZoom" aria-label="Zoom image">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="11" y1="8" x2="11" y2="14"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </button>
      </div>

      <Teleport to="body">
        <Transition name="zoom-overlay">
          <div v-if="zoomed" class="zoom-overlay" @click="closeZoom">
            <button class="zoom-close-btn" @click="closeZoom" aria-label="Close zoom">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div class="zoom-image-wrap" @click.stop>
              <img
                :src="product.image_url"
                :alt="product.name"
                class="zoom-image"
                @error="onImageError"
              />
            </div>
            <p class="zoom-caption">{{ product.name }}</p>
          </div>
        </Transition>
      </Teleport>

      <div class="product-info">
        <span class="category-badge">{{ product.category }}</span>
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-price">{{ formatPrice(product.price) }}</p>
        <p class="product-description">{{ product.description }}</p>

        <p class="stock-info">
          <span :class="product.stock_quantity > 0 ? 'in-stock' : 'out-of-stock'">
            {{ product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock' }}
          </span>
        </p>

        <div class="add-to-cart-row">
          <div class="qty-selector">
            <button class="qty-btn" @click="decrementQty">−</button>
            <span class="qty-value">{{ quantity }}</span>
            <button class="qty-btn" @click="incrementQty">+</button>
          </div>

          <button
            class="add-btn"
            :disabled="product.stock_quantity === 0"
            @click="handleAddToCart"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import axios from 'axios';
import type { Product } from '../types';
import { useCartStore } from '../stores/cart';

const route = useRoute();
const cartStore = useCartStore();

const product = ref<Product | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const quantity = ref(1);
const zoomed = ref(false);

function openZoom() {
  zoomed.value = true;
}

function closeZoom() {
  zoomed.value = false;
}

watch(zoomed, (val) => {
  document.body.style.overflow = val ? 'hidden' : '';
});

onMounted(async () => {
  try {
    const response = await axios.get<Product>(`/api/products/${route.params.id}`);
    product.value = response.data;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load product';
  } finally {
    loading.value = false;
  }
});

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

function onImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f3f1'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23bbb' font-size='16' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E";
}

function incrementQty() {
  if (quantity.value < 10) quantity.value++;
}

function decrementQty() {
  if (quantity.value > 1) quantity.value--;
}

function handleAddToCart() {
  if (product.value) {
    cartStore.addItem(product.value, quantity.value);
    if (!cartStore.isOpen) {
      cartStore.toggleCart();
    }
  }
}
</script>

<style scoped>
.product-detail-view {
  padding-bottom: 4rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: #666;
  text-decoration: none;
  font-size: 0.85rem;
  margin-bottom: 2rem;
  transition: color 0.15s ease;
}

.back-link svg {
  width: 16px;
  height: 16px;
}

.back-link:hover {
  color: #111;
}

.state-message {
  text-align: center;
  padding: 5rem 0;
  color: #999;
}

.state-message.error {
  color: #dc2626;
}

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

@media (max-width: 700px) {
  .product-detail {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.product-image-wrap {
  position: relative;
  display: inline-block;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f0f0ed;
  border: 1px solid #e5e5e3;
  box-shadow: inset 0 -4px 12px rgba(0, 0, 0, 0.04);
  padding: 0.6rem;
  cursor: zoom-in;
  max-width: 100%;
}

.product-image {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 6px;
}

.zoom-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.92);
  color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 0.2s ease, transform 0.2s ease, background-color 0.15s ease;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
}

.product-image-wrap:hover .zoom-btn {
  opacity: 1;
  transform: scale(1);
}

.zoom-btn:hover {
  background-color: #fff;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.category-badge {
  display: inline-block;
  background-color: #f3f3f1;
  color: #666;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  align-self: flex-start;
}

.product-name {
  font-size: 1.65rem;
  font-weight: 700;
  color: #111;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.product-price {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111;
  margin: 0;
}

.product-description {
  color: #555;
  line-height: 1.7;
  margin: 0;
  font-size: 0.95rem;
}

.stock-info {
  margin: 0;
  font-size: 0.83rem;
}

.in-stock {
  color: #16a34a;
  font-weight: 600;
}

.out-of-stock {
  color: #dc2626;
  font-weight: 600;
}

.add-to-cart-row {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  margin-top: 0.25rem;
}

.qty-selector {
  display: flex;
  align-items: center;
  gap: 0rem;
  border: 1px solid #e5e5e3;
  border-radius: 8px;
  overflow: hidden;
}

.qty-btn {
  background: none;
  border: none;
  color: #111;
  font-size: 1.1rem;
  cursor: pointer;
  width: 36px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease;
}

.qty-btn:hover {
  background-color: #f3f3f1;
}

.qty-value {
  min-width: 36px;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  color: #111;
  border-left: 1px solid #e5e5e3;
  border-right: 1px solid #e5e5e3;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-btn {
  flex: 1;
  background-color: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0 1.5rem;
  height: 40px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.01em;
  transition: background-color 0.15s ease;
}

.add-btn:hover:not(:disabled) {
  background-color: #333;
}

.add-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
</style>

<style>
.zoom-overlay {
  position: fixed;
  inset: 0;
  z-index: 300;
  background-color: rgba(0, 0, 0, 0.82);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  cursor: zoom-out;
}

.zoom-close-btn {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.12);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.zoom-close-btn:hover {
  background-color: rgba(255, 255, 255, 0.22);
}

.zoom-image-wrap {
  max-width: min(640px, 90vw);
  max-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
}

.zoom-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
}

.zoom-caption {
  margin: 1rem 0 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
}

.zoom-overlay-enter-active,
.zoom-overlay-leave-active {
  transition: opacity 0.2s ease;
}

.zoom-overlay-enter-from,
.zoom-overlay-leave-to {
  opacity: 0;
}

.zoom-overlay-enter-active .zoom-image-wrap,
.zoom-overlay-leave-active .zoom-image-wrap {
  transition: transform 0.2s ease;
}

.zoom-overlay-enter-from .zoom-image-wrap,
.zoom-overlay-leave-to .zoom-image-wrap {
  transform: scale(0.92);
}
</style>
