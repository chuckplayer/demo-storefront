<template>
  <div class="product-card">
    <div class="product-image-link" @click.prevent="handleImageClick">
      <RouterLink :to="`/products/${product.id}`" class="product-image-anchor">
        <div class="product-image-wrap">
          <img
            :src="product.image_url"
            :alt="product.name"
            class="product-image"
            @error="onImageError"
          />
          <button class="zoom-btn" @click.stop.prevent="openZoom" aria-label="Zoom image">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="11" y1="8" x2="11" y2="14"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>
        </div>
      </RouterLink>
    </div>
    <div class="product-body">
      <span class="category-badge">{{ product.category }}</span>
      <RouterLink :to="`/products/${product.id}`" class="product-name-link">
        <h3 class="product-name">{{ product.name }}</h3>
      </RouterLink>
      <p class="product-price">{{ formatPrice(product.price) }}</p>
      <button class="add-to-cart-btn" @click="$emit('add-to-cart', product)">
        Add to Cart
      </button>
    </div>
  </div>

  <Teleport to="body">
    <Transition name="zoom-overlay">
      <div v-if="zoomed" class="zoom-overlay" @click="closeZoom" @keydown.esc="closeZoom">
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
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import type { Product } from '../types';

defineProps<{
  product: Product;
}>();

defineEmits<{
  (e: 'add-to-cart', product: Product): void;
}>();

const zoomed = ref(false);

function openZoom() {
  zoomed.value = true;
}

function closeZoom() {
  zoomed.value = false;
}

function handleImageClick() {
  // intentionally empty — lets RouterLink handle navigation
}

watch(zoomed, (val) => {
  document.body.style.overflow = val ? 'hidden' : '';
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
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='160' viewBox='0 0 200 160'%3E%3Crect width='200' height='160' fill='%23f0f0ee'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23bbb' font-size='13' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E";
}
</script>

<style scoped>
.product-card {
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #e5e5e3;
  overflow: hidden;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-color: #ccc;
}

.product-image-link {
  display: block;
}

.product-image-anchor {
  display: block;
  text-decoration: none;
}

.product-image-wrap {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f3f3f1;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.03);
}

.zoom-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
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

.product-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
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

.product-name-link {
  text-decoration: none;
}

.product-name {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #111;
  line-height: 1.35;
  transition: color 0.15s ease;
}

.product-name-link:hover .product-name {
  color: #444;
}

.product-price {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #111;
}

.add-to-cart-btn {
  margin-top: auto;
  background-color: #111;
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease;
  letter-spacing: 0.01em;
}

.add-to-cart-btn:hover {
  background-color: #333;
}

.add-to-cart-btn:active {
  background-color: #000;
}

/* Zoom overlay — rendered via Teleport, so not scoped to card */
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

/* Transition */
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
